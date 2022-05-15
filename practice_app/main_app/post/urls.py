from django.urls import path, include
from . import views
from .views import PostCreateView

urlpatterns = [
    path('', views.home, name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
]

