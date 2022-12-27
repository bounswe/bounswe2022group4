"""heka URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#schema_view = get_schema_view(title='API Schema', description='HEKA API Documentation')


schema_swagger = get_schema_view(openapi.Info(
      title="HEKA API Documentation",
      description="REST API documentation of HEKA application.",
      default_version="v0.1.0",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="bounheka1@gmail.com"),
    license=openapi.License(name="HEKA License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include("users.urls")),
    path('api/chat/', include('chat.urls')),
    path('api/post/', include("posts.urls")),
    path('api/annotation/', include("annotations.urls")),
    path('api/search/', include("textSearch.urls")),
    path('swagger/', schema_swagger.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('redoc/', schema_swagger.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
