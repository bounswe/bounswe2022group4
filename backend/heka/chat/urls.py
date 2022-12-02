from django.urls import path
from .views import ChatView
urlpatterns = [
    # To fetch all messages sent from sender to receiver
    path('message/<int:receiver>', ChatView.as_view(), name='get-chat'),  # GET request.
    # To send new message
    #path('message', views.message_list, name='message-list'),   # POST request
    path("message", ChatView.as_view(), name='chat'),
]