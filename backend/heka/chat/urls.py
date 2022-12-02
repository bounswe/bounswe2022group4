from django.urls import path
from .views import ChatView
urlpatterns = [
    path('message/<int:receiver>', ChatView.as_view(), name='get-chat'), 
    path("message", ChatView.as_view(), name='chat'),
]