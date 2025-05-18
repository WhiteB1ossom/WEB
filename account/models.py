from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    category = models.IntegerField(null=False,default=0)
    nickname = models.CharField(max_length=30, unique=True, null=False)

    class Meta:
        db_table = 'user'