from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.urls import path
from . import views
from .views import UserTokenView, RegisterAPIView, LogoutView

urlpatterns = [
    path('', views.get_routes),
    path('sign-up/', RegisterAPIView.as_view(), name='sign-up'),
    path('login/', UserTokenView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]
