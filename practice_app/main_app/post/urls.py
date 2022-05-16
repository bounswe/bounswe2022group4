from django.urls import path, include
from . import views
from .views import PostCreateView, PostDeleteView, PostDetailView

urlpatterns = [
    path('', views.home, name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]

