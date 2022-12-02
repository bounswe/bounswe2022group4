from django.urls import path
from django.conf.urls import url
from .views import CreatePostAPIView, UpdatePostAPIView, DeletePostAPIView, FetchPostAPIView
from .views import CreateCommentAPIView

urlpatterns = [
    path("create-post", CreatePostAPIView.as_view(),  name='create-post'),
    url(r'^update/(?P<slug>[\w-]+)/$', UpdatePostAPIView.as_view(), name='update-post'),
    url(r'^delete/(?P<slug>[\w-]+)/$', DeletePostAPIView.as_view(), name='delete-post'),
    url(r'^fetch/(?P<slug>[\w-]+)/$', FetchPostAPIView.as_view(), name='fetch-post'),
   # path("delete-post", DeletePostAPIView.as_view(),  name='delete-post'),
  #  path("update-post/?{slug}/", UpdatePostAPIView.as_view(),  name='update-post'),
    path("create-comment", CreateCommentAPIView.as_view(), name='create-comment'),
]