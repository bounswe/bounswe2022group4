from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from rest_framework import status
from .views import FetchView, SendView, MessagedUsersView
from .models import User

# Create your tests here.

class ChatTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

        self.view_send = SendView.as_view()
        self.view_fetch = FetchView.as_view()
        self.view_messaged = MessagedUsersView.as_view()
        
        self.url_send = "/api/chat/send/message"
        self.url_fetch = "/api/chat/fetch/message"
        self.url_messaged = "/api/chat/fetch/users"

        self.data_one = {
            "email": "chat_test_one@gmail.com",
            "username": "chat_test_one",
            "password": "1234",
            "is_expert": False
        }

        self.data_two = {
            "email": "chat_test_two@gmail.com",
            "username": "chat_test_two",
            "password": "1234",
            "is_expert": False
        }

        self.test_user_one = User.objects.create(**self.data_one)
        self.test_user_two = User.objects.create(**self.data_two)

    def test_send_message(self):
        data = {
            "receiver": self.test_user_two.username, 
            "message": "test"
        }

        request = self.factory.post(self.url_send, data, format="json")

        force_authenticate(request, user=self.test_user_one)
        response = self.view_send(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_fetch_message(self):
        data = {
            "receiver": self.test_user_two.username, 
        }
        request = self.factory.post(self.url_fetch, data, format="json")
        force_authenticate(request, user=self.test_user_one)
        response = self.view_fetch(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fetch_messaged_users(self):
        request = self.factory.get(self.url_messaged)
        force_authenticate(request, user=self.test_user_one)
        response = self.view_messaged(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
