from django.urls import path
from django.conf.urls import url
from .views import CreatePostAPIView, UpdatePostAPIView, DeletePostAPIView, FetchPostAPIView
from .views import CreateCommentAPIView, UpdateCommentAPIView, DeleteCommentAPIView

urlpatterns = [
    path("create-post", CreatePostAPIView.as_view(),  name='create-post'),
    url(r'^update/(?P<slug>[\w-]+)/$', UpdatePostAPIView.as_view(), name='update-post'),
    url(r'^delete/(?P<slug>[\w-]+)/$', DeletePostAPIView.as_view(), name='delete-post'),
    url(r'^fetch/(?P<slug>[\w-]+)/$', FetchPostAPIView.as_view(), name='fetch-post'),
    url(r'^create-comment/(?P<slug>[\w-]+)/$', CreateCommentAPIView.as_view(), name='create-comment'),
    url(r'^update-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', UpdateCommentAPIView.as_view(), name='update-comment'),
    url(r'^delete-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', DeleteCommentAPIView.as_view(), name='delete-comment'),
]