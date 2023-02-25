from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Swagger Docs",
        default_version='v1',
        description="API description",

    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("admin/", admin.site.urls),
    path('api/v1/', include('authentication.urls')),
    path('api/v1/users/', include('user_settings.urls')),
    path('api/v1/', include('sales.urls')),
    path('api/v1/', include('countries.urls'))
]
