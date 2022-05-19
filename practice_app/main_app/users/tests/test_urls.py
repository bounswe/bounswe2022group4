from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import resolve, reverse
from users.views import register_user, getUsers,UserView
from django.contrib.auth import views as auth_views

class TestUrls(TestCase):
    def setUp(self):
        self._user = User.objects.create(
            username='username_try',
            password='password_try',
            email='email_try@gmail.com'
        )

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, register_user)

    def test_all_users_url_resolves(self):
        url = reverse('all-users')
        self.assertEquals(resolve(url).func, getUsers)

    def test_login_url_resolves(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func.view_class, auth_views.LoginView)

    def test_logout_url_resolves(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func.view_class, auth_views.LogoutView)

 #  def test_api_url_resolves(self):
 #       url = reverse('api_users')
  #      self.assertEquals(resolve(url).func.view_class, UserView)

