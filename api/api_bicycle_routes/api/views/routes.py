from api.helpers import Levels
from api.models import Route
from cerberus import Validator
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime
from api.models import Route
from django.db.models import Q
from api.serializers import RouteSerializer
import pytz
from django.utils import timezone

class RouteAPI(APIView):

    permission_classes = (
        IsAuthenticated,
    )
    
    def get(self,request):
        """ Get my routes """
        user = request.user
        filters = (Q(user=user),)
        routes = Route.objects.filter(*filters)
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

