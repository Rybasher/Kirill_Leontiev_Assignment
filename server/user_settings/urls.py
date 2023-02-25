from django.urls import path
from .views import UserSettingsDetail, UserListView

urlpatterns = [
    path('', UserListView.as_view(), name='user-settings'),
    path('<int:id>/', UserSettingsDetail.as_view(), name='user-settings-detail'),
]