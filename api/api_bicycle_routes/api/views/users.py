from cerberus import Validator
from django.contrib.auth import authenticate
from django.db import models, transaction
from django.db.models import Q
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import UserGetSerializer, UserUpdateSerializer
from django.contrib.auth.hashers import make_password
from api.models import Route, User


class UserRegister(APIView):

    def post(self, request):
        """ Register Method """
        validator = Validator(
            schema={
                "full_name": {
                    "required": True,
                    "type": "string"
                },
                "last_name": {
                    "required": True,
                    "type": "string"
                },
                "email": {
                    "required": True,
                    "type": "string"
                },
                "password": {
                    "required": True,
                    "type": "string"
                },
            }
        )

        if not validator.validate(
            document=request.data,
        ):
            return Response(
                data={
                    "message": "Invalid input",
                    "error": validator.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        filters = [
            Q(email=validator.document.get('email'))
        ]
        user = User.objects.filter(*filters)
        if (user):
            return Response(
                data={
                    "message": "Email already used",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(**validator.document)

        return Response(
            data={
                "pk": user.pk,
                "message": "created_successfully"
            },
            status=status.HTTP_200_OK,
        )

class Login(APIView):

    def post(self, request):
        validator = Validator(
            schema={
                "email": {
                    "required": True,
                    "type": "string",
                },
                "password": {
                    "required": True,
                    "type": "string",
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
        user = authenticate(
            username=request.data.get("email"),
            password=request.data.get("password"),
        )        
        user_serializer = UserGetSerializer(user)
        if user is None:
            return Response(
                data={
                    "error": "User not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        token = Token.objects.update_or_create(
            user=user,
            defaults={
                "user": user,
            },
        )[0]
        return Response(
            data={
                "user": user_serializer.data,
                "token": token.key
            },
            status=status.HTTP_200_OK,
        )
    
class UserDeleteUser(APIView):

    permission_classes = (
        IsAuthenticated,
    )
    @ transaction.atomic(savepoint=True)
    def post(self, request):
        user = request.user
        sid = transaction.savepoint()
        try:
            user.route_user.all().update(status=Route.Status.DESACTIVATE)
            user.is_active = False
            user.save()
            return Response(
                data={
                    "msg": "Deleted Successfully",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            transaction.savepoint_rollback(sid)
            return Response(
                data={
                    "msg": f"Error: {str(e)}",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

class UserManagement(APIView):
    permission_classes = (
        IsAuthenticated,
    )
    def get(self, request):
        """ Get info about user """
        user = request.user
        if not user:
             return Response(
                {
                    "error": "User Not Found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        user_serializer = UserGetSerializer(user)
        return Response(
            {
                "users": user_serializer.data
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        validator = Validator(
            schema={
                "full_name": {
                    "required": True,
                    "type": "string"
                },
                "last_name": {
                    "required": True,
                    "type": "string"
                },
                "password": {
                    "required": True,
                    "type": "string"
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
        if not user:
             return Response(
                {
                    "error": "User Not Found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        validator.document["password"] = make_password(validator.document["password"])
        user_serializer = UserUpdateSerializer(user, data=validator.document)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(
                data={
                    "details": user_serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response(
            {
                "msg": "User Data Updated"
            },
            status=status.HTTP_200_OK,
        )
        
        