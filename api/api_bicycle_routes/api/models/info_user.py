from django.db import models
from api.models import User

class InfoUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    class typeIdentify(models.IntegerChoices):
        CC = 0
        CE = 1
        OT = 2
    identify = models.CharField(max_length=50)
    type_idnetify = models.SmallIntegerField(default=typeIdentify.CC)
    class genereType(models.IntegerChoices):
        MALE = 0
        FAMALE = 1
    genere = models.SmallIntegerField(default=genereType.MALE)
    birthdate = models.DateField(auto_now=False, auto_now_add=False)
    
    class Meta:
        verbose_name = "Info User"
        verbose_name_plural = "Info Users"
    
    def __str__(self):
        return f"{self.pk} {self.user.name}"