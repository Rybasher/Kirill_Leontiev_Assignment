from django.db import models
from authentication.models import CustomUser
# Create your models here.


class UserSettings(models.Model):
    GENDER = (
        ('male', 'male'),
        ('female', 'female'),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    gender = models.CharField(max_length=100, choices=GENDER, default='male')
    age = models.IntegerField(blank=True, null=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'{self.user}'
