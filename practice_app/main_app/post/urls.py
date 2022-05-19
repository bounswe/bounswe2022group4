from django.urls import path, include
from . import views
from .views import PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, LikeView, DislikeView

urlpatterns = [
    path('', PostListView.as_view(), name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path("like/<int:pk>", LikeView, name="like_post"),
    path("dislike/<int:pk>", DislikeView, name="dislike_post")
]

