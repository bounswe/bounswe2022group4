from django.urls import path
from .views import ChatView, SendMessageView
urlpatterns = [
    path('message/<int:receiver>', ChatView.as_view(), name='get-chat'), 
    path("message", SendMessageView.as_view(), name='chat'),
]