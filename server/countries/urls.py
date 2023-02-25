from django.urls import path
from countries.views import CountriesView, CityAPIView

urlpatterns = [
    path('countries/', CountriesView.as_view()),
    path('cities/<int:country_id>/', CityAPIView.as_view(), name='cities'),]
