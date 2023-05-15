from rest_framework import serializers
from api.models import CodeRecoveryUser

class CodeRecoveryUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CodeRecoveryUser
        fields = ('__all__')