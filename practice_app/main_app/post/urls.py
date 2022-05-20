from django.urls import path, include
from . import views

from rest_framework import routers
from .views import CommentCreateView, PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, bmi_calculator, CommentDeleteView, search_disease




router = routers.DefaultRouter()
router.register(r'comments-api', views.CommentViewSet)
router.register(r'posts', views.PostViewSet)

from .views import PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, LikeView, DislikeView
from .views import CommentCreateView, CommentDeleteView, PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, LifeExpectancyAtBirth


urlpatterns = [
    path('', PostListView.as_view(), name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path('post/<int:pk>/comment/', CommentCreateView.as_view(), name='comment-create'),
    path('router-view/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('post/bmi-calculator/', views.bmi_calculator, name="bmi_calculator"),    
    path('post/search_disease/', views.search_disease, name="search_disease"),
    path("like/<int:pk>", LikeView, name="like_post"),
    path("dislike/<int:pk>", DislikeView, name="dislike_post"),
    path('post/<int:pk>/comment/', CommentCreateView.as_view(), name='comment-create'),
    path('post/<int:pk>/comment/delete', CommentDeleteView.as_view(), name='comment-delete'),
    path('life_expectancy/', LifeExpectancyAtBirth, name='life_expectancy'),
]

