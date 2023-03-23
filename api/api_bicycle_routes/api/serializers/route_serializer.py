from rest_framework import serializers
from api.models import Route

class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = ('__all__')