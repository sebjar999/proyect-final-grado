from api.helpers import Levels
from api.models import Route
from cerberus import Validator
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime
from api.models import Route, Suscription
from django.db.models import Q
from api.serializers import RouteSerializer,RouteSerializer
import pytz
from django.utils import timezone
from api.helpers import send_email_test
from django.conf import settings


class RouteAPI(APIView):

    permission_classes = (
        IsAuthenticated,
    )
    
    def get(self,request):
        """ Get my routes """
        user = request.user
        filters = (Q(user=user),)
        routes = Route.objects.filter(*filters).all()
        
        routeserializer = RouteSerializer(routes, many = True)
        return Response(
                {
                    "routes": routeserializer.data,
                },
                status=status.HTTP_200_OK,
            )

    @transaction.atomic(savepoint=True)
    def post(self,request):
        """ Crate new route """
        validator = Validator(
            schema={
                "start_route":{
                    "required": True,
                    "type":"string"
                },
                "end_route":{
                    "required": True,
                    "type":"string"
                },
                "route_level":{
                    "required": True,
                    "type":"number",
                    "allowed":Levels.values 
                },
                "date_route":{
                    "required": True,
                    "type":"datetime",
                    "coerce":lambda s: datetime.strptime(s, '%Y-%m-%d %H:%M:%S')
                },
            }
        )
    
        if not validator.validate(request.data):
            return Response(
                {
                    "details": validator.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user

        to_add = validator.document
        to_add['user'] = user
        sid = transaction.savepoint()
        try:
            Route.objects.create(**to_add)
        except Exception as e:
            transaction.savepoint_rollback(sid)
            return Response({
                "msg": "Route could not be created"
            }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
                {
                    "msg": "Route created successfully",
                },
                status=status.HTTP_200_OK,
            )

    def patch(self, request):
        
        validator = Validator(
            schema={
                "id":{
                    "required": True,
                    "type": "integer"
                },
                "date_route":{
                    "required": True,
                    "type":"datetime",
                    "coerce":lambda s: datetime.strptime(s, '%Y-%m-%d %H:%M:%S')
                },
            }
        )
        
        if not validator.validate(request.data):
            return Response(
                {
                    "details": validator.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        filters = (Q(id=validator.document.get("id")),)
        route = Route.objects.filter(*filters).first()
        if not route:
            return Response(
                {
                    "msg": f"Route not found with this id",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        time_send = validator.document.get("date_route")
        time_now = datetime.now()
        if(time_send < time_now):
            return Response(
                {
                    "msg": "Date should greater than today",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        route.date_route = time_send
        route.save()
        filters = (Q(route=route),)
        suscriptions_emails = Suscription.objects.filter(*filters).values_list("user__email", flat=True).distinct()
        send_email_test(
            "Ruta actualizada",
            f"El usuario { route.user.full_name } a actualizado la fecha de la ruta { route.start_route } a { route.end_route } ingrese al aplicativo para más información",
            settings.EMAIL_HOST_USER,
            suscriptions_emails,   
            False,
        )
        return Response(
                {
                    "msg": "succesfully",
                },
                status=status.HTTP_200_OK,
            )
        

class RouteActiveAPI(APIView):

    permission_classes = (
        IsAuthenticated,
    )
    
    def get(self,request):
        """ Get my routes """
        user = request.user
        today = datetime.now().strftime("%Y-%m-%d")
        filters = (Q(user=user),Q(status=Route.Status.ACTIVE),Q(date_route__gte=today),)
        routes = Route.objects.filter(*filters).all()
        routeserializer = RouteSerializer(routes, many = True)
        return Response(
                {
                    "routes": routeserializer.data,
                },
                status=status.HTTP_200_OK,
            )
        


class RouteDesactivateRouteAPI(APIView):
      def patch(self, request):
        validator = Validator(
            schema={
                "route_id":{
                    "required": True,
                    "type": "integer"
                },
                "status":{
                    "required": True,
                    "type":"integer",
                    "allowed": Route.Status.values
                },
            }
        )
        
        if not validator.validate(request.data):
            return Response(
                {
                    "details": validator.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        filters = (Q(id=validator.document.get("route_id")),)
        route = Route.objects.filter(*filters).first()
        if not route:
            return Response(
                {
                    "msg": f"Route not found with this id",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        route.status = validator.document.get("status")
        route.save()
        filters = (Q(route=route),)
        suscriptions_emails = Suscription.objects.filter(*filters).values_list("user__email", flat=True).distinct()
        send_email_test(
            "Ruta actualizada",
            f"El usuario { route.user.full_name } a actualizado el estado la ruta { route.start_route } a { route.end_route } ingrese al aplicativo para más información",
            settings.EMAIL_HOST_USER,
            suscriptions_emails,   
            False,
        )
        return Response(
                {
                    "msg": "succesfully",
                },
                status=status.HTTP_200_OK,
            )
           

class RouteAllAPI(APIView):
    """ Get all routes with status  ACTIVE """

    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request):
        user = request.user
        today = datetime.now().strftime("%Y-%m-%d")
        filters = (
            Q(status=Route.Status.ACTIVE),
            Q(date_route__gte=today),
            ~Q(user=user),
            ~Q(suscription_route_related__user=user)
        )
        routes = Route.objects.filter(*filters)
        routeserializer = RouteSerializer(routes, many = True)
        return Response(
                {
                    "routes": routeserializer.data,
                },
                status=status.HTTP_200_OK,
            )

class GetRoutesByUser(APIView):
    permission_classes = (
        IsAuthenticated,
    )
    def get(self, request):
        validator = Validator(
            schema={
                "id":{
                    "required": True,
                    "type":"string",
                },
            }
        )
        
        
        

class GetRouteUpdate(APIView):
    permission_classes = (
        IsAuthenticated,
    )
    
    def get(self, request):
        validator = Validator(
            schema={
                "id":{
                    "required": True,
                    "type":"string",
                },
            }
        )
        if not validator.validate(request.query_params):
            return Response(
                {
                    "details": validator.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        filter = (Q(id=validator.document.get("id")),)
        route = Route.objects.filter(*filter).first()
        route_serializer = RouteSerializer(route)
        return Response(
            {
                "routes": route_serializer.data,
            },
            status=status.HTTP_200_OK,
        )