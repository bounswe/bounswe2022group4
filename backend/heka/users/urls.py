from django.urls import path
<<<<<<< HEAD
from .views import RegisterView, LoginView, HomeView, LogoutView, ProfilePageView
from .views import SearchUserAPIView
from django.conf.urls import url
=======
from .views import RegisterView, LoginView, HomeView, LogoutView, ProfilePageView, ForgetPasswordView, ResetPasswordView
from django.contrib.auth import views as auth_views
>>>>>>> 09e72f374a5e222691c58ddd3563ff194f803faf

urlpatterns = [
    path("register", RegisterView.as_view(), name='register'),
    path("login", LoginView.as_view(),name='login'),
    path("home", HomeView.as_view(), name='home'),
    path("logout", LogoutView.as_view(), name='logout'),
    path("profilepage/<str:username>", ProfilePageView.as_view(), name='profilepage'),
<<<<<<< HEAD
    url(r'^search/(?P<keyword>[\w-]+)/$', SearchUserAPIView.as_view(), name='search-user'),
=======

    path("forget_password", ForgetPasswordView.as_view(), name='forget'),
    path("reset_password", ResetPasswordView.as_view(), name='reset'),
>>>>>>> 09e72f374a5e222691c58ddd3563ff194f803faf
]
