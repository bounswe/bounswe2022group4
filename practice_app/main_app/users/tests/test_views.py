from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self._user = User.objects.create(
            username='username_try',
            password='password_try_10',
            email='username_try@gmail.com'
        )

        self.test_data = {
            'username': 'test_name',
            'email': 'email@gmail.com',
            'password': 'Password10'
        }
        self.test_data_wrong_email = {
            'username': 'test_name',
            'email': 'a',
            'password': 'Password'
        }

        self.api_user_url = 'http://127.0.0.1:8000/api2/users/'
        self.getUsers_url = reverse('all-users')
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

    def test_getUsers_GET(self):
        response = self.client.get(self.getUsers_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/ListAllUsers.html')

    def test_create_user_GET(self):
        response = self.client.get(self.register_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/register.html')

    def test_api_create_user_POST(self):
        response = self.client.post(self.api_user_url, self.test_data)

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.data['email'], 'email@gmail.com')
        self.assertEquals(response.data['username'], 'test_name')

    def test_api_create_user_not_unique_email(self):
        response = self.client.post(self.api_user_url, self.test_data_wrong_email)
        self.assertEquals(response.status_code, 400)

    def test_api_create_user_wrong_email(self):
        response = self.client.post(self.api_user_url, self.test_data_wrong_email)
        self.assertEquals(response.status_code, 400)

    def test_api_create_user_existing_email(self):
        response = self.client.post(self.api_user_url, self.test_data)
        response_ = self.client.post(self.api_user_url, self.test_data)
        self.assertEquals(response_.status_code, 400)
