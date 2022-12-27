from django.urls import path
from .views import SearchUserView, SearchPostView, SortPostView
urlpatterns = [
    path('user', SearchUserView.as_view(), name='search-user'), 
    path('post', SearchPostView.as_view(), name='search-post'), 
    path('sort', SortPostView.as_view(), name='sort-post'), 
]