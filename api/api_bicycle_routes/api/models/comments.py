from django.db import models
from .suscription import Suscription
from api.models import User, Route


class Commnets(models.Model):
    routes = models.ForeignKey(
        Route, 
        on_delete=models.CASCADE, 
        related_name="route_comment",
        default=None
    )
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name="user_comment",
        default=None
    )
    comment = models.TextField()
    num_likes = models.IntegerField(default=0)
    num_likes = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
    
    def __str__(self):
        return f"{self.pk} - {self.user.full_name}"