from django.contrib import admin
from django.urls import path, include
from users import views as user_views
from django.contrib.auth import views as auth_views
from rest_framework import routers
from post import views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserView)
router.register(r'comments-api', views.CommentViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.PostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', user_views.register_user, name='register'),
    path('', include('post.urls')),
    path('', include('users.urls')),
    path('register/', user_views.register_user, name='register'),
    path('all-users/', user_views.getUsers, name='all-users'),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    path('api/', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('city/', user_views.get_city_form.as_view(), name='city-form'),
    path('city_data/',user_views.get_weather_data, name='city-data'),
    path('display_joke/', user_views.getJoke, name='display-joke'),
    path('', include('dnsApi.urls')),
]

