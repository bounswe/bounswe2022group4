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
from django.urls import path, include
from django.conf.urls import url
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

schema_view = get_schema_view(title='API Schema', description='HEKA API Documentation')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include("users.urls") ),
    path('api_documentation', schema_view, name='api_documentation'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'api_documentation'}
    ), name='swagger-ui'),
]
