from django.contrib import admin

from countries.models import Country, City

# Register your models here.

admin.site.register(Country)
admin.site.register(City)