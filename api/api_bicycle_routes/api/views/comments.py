from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from cerberus import Validator
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from api.models import Commnets, Route, Suscription
from api.serializers import CommentSerializer
from django.db.models import Q

class CommentsAPI(APIView):
    permission_classes = (
        IsAuthenticated,
    )
    def get(self, request):
        validator = Validator(
            schema={
                "route_id":{
                    "required": True,
                    "type":"integer",
                    "coerce":int
                },
            }
        )
        
        if not validator.validate(request.query_params):
            return Response(
                {
                    "details": validator.errors
                }, status=status.HTTP_400_BAD_REQUEST
            )
        user = request.user
        filters = (
            Q(route__pk=validator.document.get("route_id")),
            Q(user=user)
        )
        suscription = Suscription.objects.filter(*filters).first()
        if not suscription:
            return Response(
                {
                    "msg": "This user is not suscripted to route"
                }, status=status.HTTP_400_BAD_REQUEST
            )
        filters = (Q(suscription__route__pk=validator.document.get("route_id")),)
        comments = Commnets.objects.filter(*filters).all()
        commentSerializer = CommentSerializer(comments, many=True)    
        return Response(
            data={
                "comments": commentSerializer.data
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        validator = Validator(
            schema={
                "id_route":{
                    "required": True,
                    "type":"integer"
                },
                "comment":{
                    "required": True,
                    "type":"string"
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
        route = Route.objects.filter(id=validator.document.get("id_route")).first()
        if not route:
            return Response(
                {
                    "msg": "Route not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        filters=(Q(user=user), Q(route=route),)
        suscription = Suscription.objects.filter(*filters).first()
        comment = validator.document.get("comment")
        if not suscription:
            return Response(
                {
                    "msg": "This user is not suscripter to route",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        data_to_add = {
            'suscription': suscription.pk,
            'comment': comment,
        }
        commentSerializer = CommentSerializer(data=data_to_add)
        if commentSerializer.is_valid():
            commentSerializer.save()    
            return Response(
                {
                    "comment": commentSerializer.data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                data={
                    "details": commentSerializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
