from django.urls import path, include
from . import views
from .views import PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, LikeView, get_likes, add_likes
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('', PostListView.as_view(), name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path("like/<int:pk>", LikeView, name="like_post"),
    path("like/count/<int:pk>", get_likes, name="get_likes"),
    path("like/post/", csrf_exempt(add_likes), name="add_likes")
]

