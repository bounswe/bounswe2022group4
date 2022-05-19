from urllib import request, response
from django.test import TestCase
from django.urls import reverse, resolve
from django.db import models

from .models import Comment, Post
from django.contrib.auth.models import User


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

    
