from django.db import models
from api.models import User

class Route(models.Model):
    start_route = models.CharField(max_length=50)
    end_route = models.CharField(max_length=50)
    route_level = models.CharField(max_length=50)
    date_route = models.DateTimeField(auto_now=False, auto_now_add=False)

    class Status(models.IntegerChoices):
        ACTIVE = 0
        DESACTIVATE = 1
    status = models.SmallIntegerField(default=Status.ACTIVE)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='route_user',
        null=True
    )
    class Meta:
        verbose_name = "Route"
        verbose_name_plural = "Routes"
    
    def __str__(self):
        return f"{self.pk} - {self.start_route} {self.end_route}"