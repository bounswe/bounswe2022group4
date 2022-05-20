from urllib import request, response
from django.test import TestCase, Client
from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from django.db import models
from django.contrib.auth.models import User

from .models import Comment, Post, Category
from django.contrib.auth.models import User
from .views import PostCreateView, PostUpdateView, PostDeleteView


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


class URLTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='username_try',
            password='password_try',
            email='email_try@hotmail.com'
        )
        self.user.save()
        self.category = Category(name='a', description= 'aaa')
        self.category.save()
        self.post = Post.objects.create(
            title='Test Post', content='Content of the test post', category=self.category, author=self.user,
        )


    def test_homepage(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_create_post_not_logged_in(self):
        response = self.client.get('/post/new/')
        self.assertEqual(response.status_code, 302) # redirect for login
        self.assertEqual(response.url, '/login/?next=/post/new/')


    def test_create_post_logged_in(self):
        self.client.login(
            username='username_try',
            password='password_try',
            email='email_try@gmail.com'
        )
        response = self.client.post('/post/new/', {'title': 'a'})
        self.assertTrue(response, 200)

    # def test_delete_post_url_resolves(self):
    #     url = '/post/delete/1'
    #     self.assertEquals(resolve(url).func.view_class, PostDeleteView)
    #
    # def test_update_post_url_resolves(self):
    #     url = '/post/update/1'
    #     self.assertEquals(resolve(url).func.view_class, PostUpdateView)


class ModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='username_try',
            password='password_try',
            email='email_try@hotmail.com'
        )
        self.user.save()
        self.category = Category(name='a', description= 'aaa')
        self.category.save()
        self.post = Post.objects.create(
            title='Test Post', content='Content of the test post', category=self.category, author=self.user,
        )

    def test_str(self):
        self.assertEquals(self.post.__str__(), 'Test Post')

    def test_post_fields(self):
        self.assertEquals(self.post.title, "Test Post")
        self.assertEquals(self.post.content, "Content of the test post")


class PostsAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='username_try',
            password='password_try',
            email='email_try@hotmail.com'
        )
        self.user.save()
        self.category = Category(name='a', description='aaa')
        self.category.save()
        self.post = Post.objects.create(
            title='Test Post', content='Content of the test post', category=self.category, author=self.user,
        )

    def test_posts_post(self):
        data = {
            'title': 'Test Post', 'content' : 'Content of the test post', 'category': self.category, 'author' : self.user,
        }

        response = self.client.post('/api/posts', data)
        self.assertEqual(response.status_code, 301)




