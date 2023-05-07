from django.db import models
from api.models import User,Route

class Suscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    route = models.ForeignKey(
        Route, 
        on_delete=models.CASCADE,
        related_name="suscription_route_related"
    )
    created_at = models.DateField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = "Subcription"
        verbose_name_plural = "Subcriptions"
    
    def __str__(self):
        return f"{self.pk} - {self.user.full_name}"
