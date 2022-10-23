from django.urls import path
from .views import RegisterView, LoginView, HomeView, LogoutView

urlpatterns = [
    path("register", RegisterView.as_view()),
    path("login", LoginView.as_view()),
    path("home", HomeView.as_view()),
    path("logout", LogoutView.as_view()),
]
