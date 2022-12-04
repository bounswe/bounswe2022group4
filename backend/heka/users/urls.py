from django.urls import path
from .views import RegisterView, LoginView, HomeView, LogoutView, ProfilePageView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("register", RegisterView.as_view(), name='register'),
    path("login", LoginView.as_view(),name='login'),
    path("home", HomeView.as_view(), name='home'),
    path("logout", LogoutView.as_view(), name='logout'),
    path("profilepage/<str:username>", ProfilePageView.as_view(), name='profilepage'),

    path("reset_password", auth_views.PasswordResetView.as_view(), name='reset_password'),
    path("reset_password_sent", auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path("reset/<uidb64>/<token>", auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("reset_password_complete", auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
