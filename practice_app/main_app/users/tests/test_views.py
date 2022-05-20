from http import client
from django.shortcuts import get_object_or_404
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from users.models import UserProfile

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

        self.api_user_url = 'http://127.0.0.1:8000/api/users/'
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


class ProfileTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.initAlexaData = {"name" : "alexa", "surname": "alexasurname", "city" : "alexacity", "country": "alexacountry", "bio": "alexabio"}
        self.initCatilData = {"name" : "catil", "surname": "catilsurname", "city" : "catilcity", "country": "catilcountry", "bio": "catilbio"}
        self.modifiedAlexaData = {"username": "alexa","name" : "alexa2", "surname": "alexasurname2", "city" : "alexacity2", "country": "alexacountry2", "bio": "alexabio2"}
        self.alexa = User.objects.create(username="alexa", password="mypassword33A", email='alexa@gmail.com')
        self.catil = User.objects.create(username="catil", password="mypassword34B", email='alexa@gmail.com')
        self.alexaProfile = get_object_or_404(UserProfile, user__username="alexa")
        self.catilProfile = get_object_or_404(UserProfile, user__username="catil")

        for attr, value in self.initAlexaData.items(): 
            setattr(self.alexaProfile, attr, value)
        self.alexaProfile.save()

        for attr, value in self.initCatilData.items(): 
            setattr(self.catilProfile, attr, value)
        self.catilProfile.save()

    def get_profile_info_work(self):
        """People can fetch profile infos of all users with api"""
        json_response = self.client.get(reverse("all-profile-api"))
        dict_response = json_response.json
        alexa_dict = dict_response["alexa"]
        catil_dict = dict_response["catil"]
        for k in self.initAlexaData.keys():
            self.assertEqual(alexa_dict[k], self.initAlexaData[k])
        for k in self.initCatilData.keys():
            self.assertEqual(catil_dict[k], self.initCatilData[k])


    def change_profile_info_work(self):
        """People can change profile infos of selected user with api"""
        self.client.post(reverse("profile-edit-api"), data=self.modifiedAlexaData)
        self.assertEqual(self.alexaProfile.name, self.modifiedAlexaData["name"])
        self.assertEqual(self.alexaProfile.surname, self.modifiedAlexaData["surname"])
        self.assertEqual(self.alexaProfile.city, self.modifiedAlexaData["city"])
        self.assertEqual(self.alexaProfile.country, self.modifiedAlexaData["country"])
        self.assertEqual(self.alexaProfile.bio, self.modifiedAlexaData["bio"])
        """ This Api give info about username not found
                                     if data has some wrong fields, it list them and change true fields
                                     also it inform user about updated fields
                                     as html file.
            If I only return response status of the api, I could write more test cases but it cause a info loss
            So I preffered the more informative api. """