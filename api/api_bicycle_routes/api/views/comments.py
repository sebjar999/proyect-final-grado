from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from cerberus import Validator
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from api.models import Commnets, Route
from api.serializers import CommentSerializer

class CommentsAPI(APIView):
    permission_classes = (
        IsAuthenticated,
    )
    def get(self, request):
        validator = Validator(
            schema={
                "id_route":{
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
        
        comments = Commnets.objects.filter(routes__id=validator.document.get("id_route")).all()
        commentserializer = CommentSerializer(comments, many = True)
        return Response(
            {
                "comments": commentserializer.data,
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
        to_create = {
            "routes": route,
            "user": user,
            "comment":validator.document.get("comment"),
        }
        comment = Commnets.objects.create(**to_create).pk
        return Response(
            {
                "comment_pk": comment,
            },
            status=status.HTTP_200_OK,
        )



