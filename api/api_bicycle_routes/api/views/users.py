from datetime import datetime
from cerberus import Validator
from django.conf import settings
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
from api.models import Route, User, CodeRecoveryUser
from api.helpers import generar_string_aleatorio
from api.serializers import CodeRecoveryUserSerializer
from api.helpers.send_email import send_email_test


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
        
class UserCodeRecovery(APIView):
    
    def post(self, request):
        """ Send code recovery to update password """
        validator = Validator(
            schema={
                "email":{
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
        email = validator.document.get("email")
        user = User.objects.filter(Q(email=email)).first()
        if not user:
            return Response(
                {
                    "msg": f"User with email { email } not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        
        code = generar_string_aleatorio()
        code_recovery = CodeRecoveryUser.objects.filter(Q(user=user)).first()
        if code_recovery:
            codeSerializer = CodeRecoveryUserSerializer(
                instance=code_recovery,
                data={
                "user": user.id,
                "code": code,
                "date_send": datetime.now()
            })
        else:
            codeSerializer = CodeRecoveryUserSerializer(data={
                "user": user.id,
                "code": code
            })
        if not codeSerializer.is_valid():
            return Response(
                data={
                    "details": codeSerializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            codeSerializer.save()
            
        send_email_test(
            "Codigo de recuperación",
            f"Su código para recuperar contraseña es { code }",
            settings.EMAIL_HOST_USER,
            [user.email],   
            False,
        )
        return Response(
            {
                "msg": f"Code send to email",
            },
            status=status.HTTP_200_OK,
        )
    
    def patch(self, request):
        """ Update new password """
        validator = Validator(
            schema={
                "code":{
                    "required": True,
                    "type":"string"
                },
                "password":{
                    "required": True,
                    "type":"string"
                },
                "new_password":{
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
        
        code = validator.document.get("code")
        password = validator.document.get("password")
        new_password = validator.document.get("new_password")
        
        code_recovery = CodeRecoveryUser.objects.filter(Q(code=code)).first()
        if not code_recovery:
            return Response(
                {
                    "msg": "Code not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        
        user = code_recovery.user
        if new_password != password:
            return Response(
                {
                    "msg": "New password and password are differents",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        userupdateserializer = UserUpdateSerializer(instance=user, data={
            "password": make_password(password)
        })
        if userupdateserializer.is_valid():
            userupdateserializer.save()
        else:
            return Response(
                data={
                    "details": userupdateserializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        code_recovery.delete()
        return Response(
            data={
                "msg": "Password updated successfully"
            },
            status=status.HTTP_200_OK
        )
            
        