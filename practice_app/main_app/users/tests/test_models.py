from django.test import TestCase
from django.contrib.auth.models import User


class TestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='username_try',
            password='password_try',
            email='email_try@hotmail.com'
        )

    def test_str(self):
        self.assertEquals(self.user.__str__(), 'username_try')

    def test_user_fields(self):
        self.assertEquals(self.user.username, "username_try")
        self.assertEquals(self.user.email, "email_try@hotmail.com")