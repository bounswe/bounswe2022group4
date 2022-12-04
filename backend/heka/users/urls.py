from django.urls import path
from .views import RegisterView, LoginView, HomeView, LogoutView, ProfilePageView, ForgetPasswordView, ResetPasswordView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("register", RegisterView.as_view(), name='register'),
    path("login", LoginView.as_view(),name='login'),
    path("home", HomeView.as_view(), name='home'),
    path("logout", LogoutView.as_view(), name='logout'),
    path("profilepage/<str:username>", ProfilePageView.as_view(), name='profilepage'),

    path("forget_password", ForgetPasswordView.as_view(), name='forget'),
    path("reset_password", ResetPasswordView.as_view(), name='reset'),
]
