from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    STATUS = (
        ('regular', 'regular'),
        ('subscriber', 'subscriber'),
        ('admin', 'admin')
    )
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=150, choices=STATUS, default='regular')

    def __str__(self):
        return self.username
