from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, email,password, is_staff, is_superuser,is_active, **extra_fields):
        user = self.model(
            email = email,
            is_staff = is_staff,
            is_superuser = is_superuser,
            is_active = is_active,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user


    def create_superuser(self, email, password=None, **extra_fields):
        return self._create_user(email,password,True,True, True,**extra_fields)
    
    def create_user(self, email,password=None, **extra_fields):
        return self._create_user(email, password, False, False, True,**extra_fields)


class User(AbstractUser):
    full_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField("email address", blank=True,unique=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["password"]

    objects = UserManager()
    username = None


    def __str__(self):
        return f"{self.id} - {self.email}"  # type: ignore


