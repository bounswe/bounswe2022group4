from django.urls import path
from . import views
urlpatterns = [
    # To fetch all messages sent from sender to receiver
    path('message/<int:sender>/<int:receiver>', views.message_list, name='message-detail'),  # GET request.
    # To send new message
    path('message', views.message_list, name='message-list'),   # POST request
]