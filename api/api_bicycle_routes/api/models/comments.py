from django.db import models
from .suscription import Suscription
from api.models import User, Route


class Commnets(models.Model):
    suscription = models.ForeignKey(
        Suscription, 
        on_delete=models.CASCADE, 
        related_name="suscription_to_comment",
        null=True
    )
    comment = models.TextField(null=True)

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
    
    def __str__(self):
        return f"{self.pk}"