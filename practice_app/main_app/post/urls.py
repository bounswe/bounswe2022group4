from django.urls import path, include
from . import views
from rest_framework import routers
from .views import *





router = routers.DefaultRouter()
router.register(r'comments-api', views.CommentViewSet)


router_two = routers.DefaultRouter()
router_two.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.PostViewSet)
from .views import PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView, LikeView, DislikeView
from .views import CommentCreateView, CommentDeleteView, PostCreateView, PostDeleteView, PostDetailView, PostUpdateView, UserPostListView, PostListView,get_country_form,get_category_form,get_category_form_two, LifeExpectancyAtBirth



urlpatterns = [
    path('', PostListView.as_view(), name='home-page'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('user/<str:username>/posts', UserPostListView.as_view(), name='user-posts'),
    path('post/<int:pk>/comment/', CommentCreateView.as_view(), name='comment-create'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('post/bmi-calculator/', views.bmi_calculator, name="bmi_calculator"),    
    path('post/search_disease/', views.search_disease, name="search_disease"),
    path("like/<int:pk>", LikeView, name="like_post"),
    path("dislike/<int:pk>", DislikeView, name="dislike_post"),
    path('post/<int:pk>/comment/', CommentCreateView.as_view(), name='comment-create'),
    path('post/<int:pk>/comment/delete', CommentDeleteView.as_view(), name='comment-delete'),

    path('life_expectancy/', LifeExpectancyAtBirth, name='life_expectancy'),
    path("api/like/count/<int:pk>", get_likes, name="get_likes"),
    path("api/like/post/", add_likes, name="add_likes"),
    path('category/<str:cats>/', views.CategoryPostListView, name='category-posts'),
    path('coronavirus/', get_country_form.as_view(), name='country-form'),
    path('coronavirus_data/', views.get_coronavirus_data, name='corona-data'),
    path('api/', include(router_two.urls)),
    path('api-authh/', include('rest_framework.urls', namespace='rest_framework')),
    path('categoryform/', get_category_form.as_view(template_name='post/category_form.html'), name='category-form'),
    path('categoryform2/', get_category_form_two.as_view(template_name='post/category_form_two.html'), name='category-form-two'),
    path('all_categories/', views.get_all_categories, name='all-category'),
    path('add_categories/', views.add_a_category, name='add-category')


]

