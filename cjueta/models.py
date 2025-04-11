from django.db import models

# Create your models here.
class UserModel(models.Model):
    user_name = models.CharField(max_length=20, null=False)
    user_id = models.CharField(max_length=20, null=False)
    user_password = models.CharField(max_length=20, null=False)
    category = models.IntegerField(null=False)

    class Meta:
        db_table = "user"