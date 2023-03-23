from django.db import models
from .suscription import Suscription


class Commnets(models.Model):
    suscription = models.ForeignKey(Suscription, on_delete=models.CASCADE)
    comment = models.TextField()
    num_likes = models.IntegerField()
    num_likes = models.IntegerField()

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
    
    def __str__(self):
        return f"{self.pk} - {self.suscription}"