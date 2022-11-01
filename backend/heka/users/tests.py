from httplib2 import Response
from rest_framework.test import APITestCase, APIRequestFactory
from django.urls import reverse
from rest_framework import status
from .views import RegisterView, LoginView, LogoutView, HomeView
from django.contrib.auth import get_user_model


class RegisterTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = RegisterView.as_view()
        self.url = reverse('register')
    def test_register(self):
        data = {
            "name":"Canan Karatay",
            "email":"canan.karatay@gmail.com",
            "password":"karatay.1359"
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class LoginTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = LoginView.as_view()
        self.url = reverse('login')
        self.user = {
            "name":"Canan Karatay",
            "email":"canan.karatay@gmail.com",
            "password":"karatay.1359"
        }
    def test_login(self):
        request = self.factory.post( reverse('register'), self.user)
        response = RegisterView.as_view()(request)
        data = {}
        data['email'] = self.user['email']
        data['password'] = self.user['password']
        request = self.factory.post(self.url, data)
        response = self.view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)