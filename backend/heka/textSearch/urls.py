from django.urls import path
from .views import SearchUserView, SearchPostView
urlpatterns = [
    path('user', SearchUserView.as_view(), name='search-user'), 
    path('post', SearchPostView.as_view(), name='search-post'), 
]