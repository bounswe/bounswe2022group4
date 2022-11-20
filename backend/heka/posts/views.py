from importlib import import_module
from django.shortcuts import render, get_object_or_404
from requests import request
from yaml import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission
from .serializers import   PostSerializer,CommentSerializer
from .models import Post, Comment
from drf_yasg.utils import swagger_auto_schema 
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

        

class CreatePostAPIView(APIView):
    """
    post:
        Creates a new post instance. Returns created post data
        parameters: [title, body]
    """

    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(request_body = PostSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"Errors": serializer.errors}, status=400)

   
class CreateCommentAPIView(APIView):
    """
    post:
        Create a comment instance. Returns created comment data
    """

    permission_classes = [IsAuthenticated]
    def post(self, request, slug, *args, **kwargs):
        post = get_object_or_404(Post, slug=slug)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post)
            return Response(serializer.data, status=200)
        else:
            return Response({"errors": serializer.errors}, status=400)