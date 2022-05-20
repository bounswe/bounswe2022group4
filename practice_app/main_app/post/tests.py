from cgi import test
import email
from urllib import request, response
from django.test import TestCase,Client
from django.urls import reverse, resolve
from django.db import models
from mysqlx import Auth

from .models import Comment, Post,Category
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from .views import LikeView, DislikeView
# Create your tests here.


class TestCommentView(TestCase):

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

    
class TestDislikeView(TestCase):
    def test_dislike(self):
        test_user = User.objects.create(username="test_like_user", id="1", email="bayndrysf@gmail.com", password="testlikepassword")
        test_post = Post.objects.create(author=test_user)
        test_post.dislikes.add(test_user)
        expected_result = True
        actual_result = ( test_user in test_post.dislikes.all() )
        self.assertEquals(expected_result, actual_result)


class TestCategoryModels(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name = 'name_try', description= 'description_try')

    def test_str(self):
        self.assertEquals(self.category.__str__(), 'name_try')

    def test_category_fields(self):
        self.assertEquals(self.category.name, "name_try")
        self.assertEquals(self.category.description, "description_try")


class TestCategoryViews(TestCase):

    def setUp(self):
        self.client = Client()
        self._category = Category.objects.create(name = 'name_try', description= 'description_try')

        self.test_data = {
            'name': 'example_name',
            'description': 'example'
        }
        
        self.getCategories_url = reverse('all-category')
        self.api_category_url = 'http://127.0.0.1:8000/api/categories/'

        self.add_url = reverse('add-category')

    def test_getCategories_GET(self):
        response = self.client.get(self.getCategories_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'post/all_categories.html')

    def test_create_category_POST(self):
        response = self.client.post(self.api_category_url, self.test_data)

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.data['name'], 'example_name')
        self.assertEquals(response.data['description'], 'example')