from rest_framework import serializers
from api.models import User

class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "full_name",
            "last_name",
            "email",
            "password"
        )
        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "full_name",
            "last_name",
            "password"
        )