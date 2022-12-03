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
from django.utils.text import slugify

    
class CreatePostAPIView(APIView):
    """
    post:
        Creates a new post instance. Returns created post data parameters: [title, body, slug]
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(request_body = PostSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UpdatePostAPIView(APIView):
    """
    post:
        Updates the post instance. Returns updated post data parameters: [title, body, slug]
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(request_body = PostSerializer)
    def post(self, request, *args, **kwargs):
        filter = {}
        filter['slug'] = self.kwargs['slug']
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, **filter)
        serializer = PostSerializer(post, data=request.data)     
        if serializer.is_valid(raise_exception=True):
            serializer.save(slug = slugify(request.data['title']))
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeletePostAPIView(APIView):
    """
    get:
        Deletes the post instance. Returns the deleted post data parameters: [title, body, slug]
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset, **filter)
        serializer = PostSerializer(post, data={"title": post.title, "body": post.body}) 
        if serializer.is_valid(raise_exception=True):
            serializer.save(slug=self.kwargs['slug']).delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class FetchPostAPIView(APIView):
    """
    post:
        Fetches the post instance. Returns post data parameters: [title, body]
    """
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug' 
    @swagger_auto_schema(request_body = PostSerializer)
    def post(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset, **filter)
        serializer = PostSerializer(post, {"title": post.title, "body": post.body} )    
        if serializer.is_valid(raise_exception=True):
            serializer.save(slug=self.kwargs['slug'])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CreateCommentAPIView(APIView):
    """
    post::
        Creates a comment instance. Returns created comment data: [body] 
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset, **filter)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeleteCommentAPIView(APIView):
    """
    post:
        Deletes the comment instance. Returns deleted comment data: [body]
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)
        
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)

        serializer = CommentSerializer(comment, data={'body':comment.body, 'parent': post})
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post).delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UpdateCommentAPIView(APIView):
    """
    post:
        Updates the comment instance. Returns updated comment data: [body]
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)

        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)

        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ListPostsAPIView(APIView):
    """
    post:
        Lists all posts.
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses = {200: PostSerializer(many=True)})
    def get(self, request):
        all_posts = Post.objects.all()
        serializer = PostSerializer(all_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


