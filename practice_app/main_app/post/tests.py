from urllib import request, response
from django.test import TestCase, Client
from django.urls import reverse, resolve
from django.db import models
from django.contrib.auth import authenticate, login
from django.conf import settings
from .models import Comment, Post
from django.contrib.auth.models import User
import requests
from django.contrib.auth.decorators import login_required
# Create your tests here.


class TestCommentView(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_author = User.objects.create(username='Tesusere', email= "ummut@gmail.com", password= "someepassword123")
        #self.test_author.save()
        self.test_post = Post.objects.create(author=self.test_author)
        self.comment = Comment.objects.create(title = "shoulder pain",content="it hurts", author = self.test_author, post=self.test_post)

        self.comment_api = 'http://127.0.0.1:8000/router-view/comments-api/'

    def test_comment_url_is_resolved(self):
        true_url = reverse('comment-create', args="1")
        self.assertEquals(true_url, '/post/1/comment/')

        false_url = reverse('comment-create', args="2")
        self.assertNotEquals(false_url, '/post/1/comment/')

    def test_comment_object__is_created(self):
        test_author = User.objects.create(username='Testuser', id="1", email= "umut@gmail.com", password= "somepassword123")
        test_post = Post.objects.create(author=test_author)
        
        test_object = Comment.objects.create(title = "shoulder pain",content="it hurts", author = test_author, post=test_post)
        
        self.assertEquals(str(test_object.title), "shoulder pain")
        self.assertEquals(str(test_object.author), "Testuser")
        self.assertEquals(test_object.author_id, 1)
        self.assertEquals(str(test_object.content), "it hurts")
        self.assertEquals(str(test_object.title), "shoulder pain")

    def test_comment_view_is_open(self):
        response = self.client.get(reverse('comment-create', args="1"))

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'post/comment_form.html')

    
    def test_comment_api_post(self):
        
            response = self.client.post(self.comment_api, {'title': 'test-title', 'content': 'test-content', 'author': self.test_author, 'post': self.test_post})
            
            self.assertGreaterEqual(response.status_code, 201)

    def test_comment_api_get(self):
            

            get_response = self.client.get('http://127.0.0.1:8000/router-view/comments-api/')


            self.assertEquals(get_response.status_code, 200) 

    def test_bmi_api(self):
            url = "https://body-mass-index-bmi-calculator.p.rapidapi.com/metric"
            querystring = {"weight":'100',"height":'1.80'}

            headers = {
                "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com",
                "X-RapidAPI-Key": "d74257fd79mshd06d57a0ab588b7p1484dejsn05d858f386ca"
            }

            response = requests.request("GET", url, headers=headers, params=querystring)
            bmi = response.json().get('bmi')

            self.assertLess(bmi, 40)
            self.assertGreater(bmi, 25)

