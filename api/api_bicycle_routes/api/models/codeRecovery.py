from django.db import models
from api.models import User

class CodeRecoveryUser(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='codeRecovery_user',
    )
    code = models.CharField(max_length=50)
    date_send = models.DateTimeField(auto_now=True, auto_now_add=False)
    class Meta:
        verbose_name = "Code Recovery"
        verbose_name_plural = "Codes Recovery"
    
    def __str__(self):
        return f"{self.pk} - {self.user.email} {self.code}"