from django.urls import path
from .views import SearchUserView
urlpatterns = [
    path('user', SearchUserView.as_view(), name='search'), 
]