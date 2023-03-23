from api.models import User
from rest_framework.views import APIView
from cerberus import Validator
from api.models import Suscription, User, Route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q




class SuscriptionAPI(APIView):

    permission_classes = (
        IsAuthenticated,
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



        




