from httplib2 import Response
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from django.urls import reverse
from rest_framework import status
from .views import RegisterView, LoginView, LogoutView, HomeView, ProfilePageView
from .models import User,UserManager
from django.contrib.auth import get_user_model


class RegisterTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = RegisterView.as_view()
        self.url = reverse('register')
    def test_register(self):
        data = {
            "email":"canan.karatay@gmail.com",
            "username":"melih",
            "password":"karatay.1359",
            "is_expert": False
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LoginTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = LoginView.as_view()
        self.url = reverse('login')
        self.user = {
            "email":"canan.karatay@gmail.com",
            "password":"karatay.1359",
            "is_expert":False
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

class ProfilePageTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ProfilePageView.as_view()
        self.url = "/api/user/profilepage"
        self.data = {
            "email": "melih@gmail.com",
            "username": "melih",
            "password": "1234",
            "is_expert": False
        }
        self.test_user = User.objects.create(**self.data)

    def test_get_profile_page(self):

        request = self.factory.get(self.url)
        force_authenticate(request, user=self.test_user)

        response = self.view(request, username="melih")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.test_user.username)
