from datetime import datetime

from cerberus import Validator
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Route, Suscription, User
from api.serializers import RouteSerializer


class SuscriptionAPI(APIView):

    permission_classes = (
        IsAuthenticated,
    )
    
    def get(self, request):
        """ Get routes that user is subscribed """
        user = request.user
        today = datetime.now().strftime("%Y-%m-%d")
        print(today)
        filters = (Q(suscription_route_related__user=user),Q(date_route__gte=today),)
        routes = Route.objects.filter(*filters).all()
        routeserializer = RouteSerializer(routes, many = True)
        return Response(
                data={
                    "routes": routeserializer.data,
                },
                status=status.HTTP_200_OK,
            )


    def post(self,request):
        validator = Validator(
            schema={
                "route_id":{
                    "required": True,
                    "type":"integer"
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

        

        filter = (Q(id=validator.document.get("route_id")),)
        route = Route.objects.filter(*filter).first()
        if not route:
            return Response(
                data={
                    "msg":"error route id not found"
                },
                status = status.HTTP_200_OK
            )
                
        user = request.user
        to_save = {
            "user":user,
            "route":route
        }
        return Response(
                data={
                    "msg": Suscription.objects.create(**to_save).pk,
                },
                status=status.HTTP_200_OK,
            )



        




