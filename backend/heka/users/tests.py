from httplib2 import Response
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from django.urls import reverse

from rest_framework import status

from .views import RegisterView, LoginView, LogoutView, HomeView, ProfilePageView
from .models import User,UserManager

from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model


class RegisterTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = RegisterView.as_view()
        self.url = reverse('register')
    def test_register(self):
        data = {
            "email":"canan.karatay@gmail.com",
            "username":"canankrty",
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
            "username":"canankrty"
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
    def test_put_profile_page(self):
        data = {
            "email": "melih@gmail.com",
            "username": "kadir",
            "is_expert": False,
            "date_joined": "2022-12-04T12:07:36.293874Z",
            "is_admin": False,
            "age": 4,
            "name": "melih aktas",
            "last_login": "2022-12-04T12:10:24.743456Z",
            "profile_image": None
        }

        request = self.factory.put(self.url, data, format="json")

        force_authenticate(request, user=self.test_user)
        response = self.view(request, username="melih")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], data["username"])
        self.assertEqual(response.data["age"], data["age"])


class LogoutTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = LogoutView.as_view()
        self.url = reverse('logout')
        self.user = {
            "name":"Canan Karatay",
            "email":"canan.karatay@gmail.com",
            "password":"karatay.1359"
        }
    def test_logout(self):
        self.token = Token.objects.get(user_username="Canan Karatay")
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
