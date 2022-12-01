from django.urls import path
from .views import CreatePostAPIView
from .views import CreateCommentAPIView

urlpatterns = [
    path("create-post", CreatePostAPIView.as_view(),  name='create-post'),
    path("create-comment", CreateCommentAPIView.as_view(), name='create-comment'),
]