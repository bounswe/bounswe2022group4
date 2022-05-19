from django.urls import path
from . import views

urlpatterns = [
    path('dns/', views.index),
]
