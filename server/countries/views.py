from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd

from countries.models import Country, City
from countries.serializers.serializer import CountrySerializer, CitySerializer


class CountriesView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CityAPIView(ListAPIView):
    serializer_class = CitySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        country_id = self.kwargs.get('country_id')
        return City.objects.filter(country_id=country_id)
