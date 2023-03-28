from rest_framework import serializers
from api.models import Commnets

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Commnets
        fields = ('__all__')