from django.db import models

from authentication.models import CustomUser


class Sale(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.CharField(max_length=50)
    sales_number = models.IntegerField()
    revenue = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.product} by user {self.user}"
