from django.db import models

class Levels(models.IntegerChoices):
    BASIC = 1
    MEDIUM = 2
    ADVANCE = 3