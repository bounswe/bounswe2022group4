from httplib2 import Response
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.test import force_authenticate
from django.urls import reverse
from rest_framework import status
from .views import CreatePostAPIView, UpdatePostAPIView, DeletePostAPIView, FetchPostAPIView
from. views import CreateCommentAPIView, UpdateCommentAPIView, DeleteCommentAPIView, FetchCommentAPIView
from .views import PostUpvoteAPIView, PostDownvoteAPIView, CommentUpvoteAPIView, CommentDownvoteAPIView
from .views import ListPostsAPIView, ListCommentsOfPostsAPIView

from django.contrib.auth import get_user_model
from users.models import User, UserManager


class CreatePostTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = CreatePostAPIView.as_view()
        self.url = '/api/post/create-post'
        self.data = {
            "email": "selen@gmail.com",
            "username": "selen",
            "password": "12345",
            "is_expert": False
        }
        self.test_user = User.objects.create(**self.data)
    def test_create_post(self):
        data = {
            "category" : "Pregnancy",
            "title"    : "How should I sleep in pregnancy?",
            "body"     : "I'm a 4 months pregnant. I have terrible insomnia in recent days. What do you recommend me \
                          to cure it?"
        }
        request = self.factory.post(self.url, data, format="json")
        force_authenticate(request, user=self.test_user)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)