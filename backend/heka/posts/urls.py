from django.urls import path
from django.conf.urls import url
from .views import CreatePostAPIView, UpdatePostAPIView, DeletePostAPIView, FetchPostAPIView, ListPostsAPIView, ListCommentsOfPostsAPIView
from .views import CreateCommentAPIView, UpdateCommentAPIView, DeleteCommentAPIView
from .views import PostUpvoteAPIView, PostDownvoteAPIView, CommentUpvoteAPIView, CommentDownvoteAPIView

urlpatterns = [
    path("create-post", CreatePostAPIView.as_view(),  name='create-post'),
    path("list-posts", ListPostsAPIView.as_view(), name='list-posts'),
    url(r'^update/(?P<slug>[\w-]+)/$', UpdatePostAPIView.as_view(), name='update-post'),
    url(r'^delete/(?P<slug>[\w-]+)/$', DeletePostAPIView.as_view(), name='delete-post'),
    url(r'^fetch/(?P<slug>[\w-]+)/$', FetchPostAPIView.as_view(), name='fetch-post'),
    url(r'^fetch-comments/(?P<slug>[\w-]+)/$', ListCommentsOfPostsAPIView.as_view(), name='fetch-comments'),
    url(r'^create-comment/(?P<slug>[\w-]+)/$', CreateCommentAPIView.as_view(), name='create-comment'),
    url(r'^update-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', UpdateCommentAPIView.as_view(), name='update-comment'),
    url(r'^delete-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', DeleteCommentAPIView.as_view(), name='delete-comment'),
    url(r'^upvote-post/(?P<slug>[\w-]+)/$', PostUpvoteAPIView.as_view(), name='upvote-post'),
    url(r'^downvote-post/(?P<slug>[\w-]+)/$', PostDownvoteAPIView.as_view(), name='downvote-post'),
    url(r'^upvote-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', CommentUpvoteAPIView.as_view(), name='upvote-comment'),
    url(r'^downvote-comment/(?P<slug>[\w-]+)/(?P<id>[\w-]+)$', CommentDownvoteAPIView.as_view(), name='downvote-comment'),

]