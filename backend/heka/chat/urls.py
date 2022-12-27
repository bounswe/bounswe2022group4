from django.urls import path
from .views import FetchView, SendView, MessagedUsersView
urlpatterns = [
    path('fetch/message', FetchView.as_view(), name='fetch-message'), 
    path("send/message", SendView.as_view(), name='send-message'),
    path("fetch/users", MessagedUsersView.as_view(), name='get-users'),
]