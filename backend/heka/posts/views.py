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
import datetime
from .permissions import IsOwnerOrReadOnly

    
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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    @swagger_auto_schema(request_body = PostSerializer)
    def post(self, request, *args, **kwargs):
        filter = {}
        filter['slug'] = self.kwargs['slug']
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, **filter)
        try:
            self.check_object_permissions(request, post)
        except:
            return Response({"Error" : "Not allowed!"}, status=status.HTTP_400_BAD_REQUEST)

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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset, **filter)
        try:
            self.check_object_permissions(request, post)
        except:
            return Response({"Error" : "Not allowed!"}, status=status.HTTP_400_BAD_REQUEST)
        
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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)
        
        try:
            self.check_object_permissions(request, comment)
        except:
            return Response({"Error" : "Not allowed!"}, status=status.HTTP_400_BAD_REQUEST)
        
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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)
        try:
            self.check_object_permissions(request, comment)
        except:
            return Response({"Error" : "Not allowed!"}, status=status.HTTP_400_BAD_REQUEST)
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
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses = {200: PostSerializer(many=True)})
    def get(self, request):
        all_posts = Post.objects.all()
        serializer = PostSerializer(all_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListCommentsOfPostsAPIView(APIView):
    """
    post:
        Lists all comments of a post.
    """
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses = {200: PostSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset, **filter)
        response = []
        for comment in post.get_comments:
            temp = {}
            temp["creator"] = comment.creator.username
            temp["body"] = comment.body
            format = '%d-%m-%Y %H:%M:%S'
            temp["created-at"] = comment.created_at.strftime(format)
            response.append(temp)
        return Response({"comments" : response}, status=status.HTTP_200_OK)

class PostUpvoteAPIView(APIView):
    """
    post:
        Upvotes the post. Returns the current number of upvotes and downvotes.
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)
        if request.user in post.upvotes.all():
            post.upvotes.remove(request.user)
        elif not request.user in post.downvotes.all():
            post.upvotes.add(request.user)
        elif request.user in post.downvotes.all():
            post.downvotes.remove(request.user)
            post.upvotes.add(request.user)
        serializer = PostSerializer(post, data={"title":post.title, "body":post.body} )
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, slug = kwargs['slug'])
        return Response({"slug": post.slug, "upvote":post.total_upvotes, "downvote": post.total_downvotes }, status=status.HTTP_200_OK)

class PostDownvoteAPIView(APIView):
    """
    post:
        Downvotes the post. Returns the current number of upvotes and downvotes.
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)
        if request.user in post.downvotes.all():
            post.downvotes.remove(request.user)
        elif not request.user in post.upvotes.all():
            post.downvotes.add(request.user)
        elif request.user in post.upvotes.all():
            post.upvotes.remove(request.user)
            post.downvotes.add(request.user)
        serializer = PostSerializer(post, data={"title":post.title, "body":post.body} )
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, slug = kwargs['slug'])
        return Response({"slug": post.slug, "upvote":post.total_upvotes, "downvote": post.total_downvotes }, status=status.HTTP_200_OK)


class CommentUpvoteAPIView(APIView):
    """
    post:
        Upvotes the comment. Returns the current number of upvotes and downvotes.
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses = {200: PostSerializer(many=True)})
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)
        if request.user in comment.upvotes.all():
            comment.upvotes.remove(request.user)
        elif not request.user in comment.downvotes.all():
            comment.upvotes.add(request.user)
        elif request.user in comment.downvotes.all():
            comment.downvotes.remove(request.user)
            comment.upvotes.add(request.user)
        serializer = CommentSerializer(comment, data={"body": comment.body })
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post)
        return Response({"slug": post.slug, "comment_id": comment.id, "upvote":comment.total_upvotes, "downvote": comment.total_downvotes }, status=status.HTTP_200_OK)

class CommentDownvoteAPIView(APIView):
    """
    post:
        Downvotes. the comment. Returns the current number of upvotes and downvotes.
    """
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses = {200: PostSerializer(many=True)})
    def post(self, request, *args, **kwargs):
        queryset_Post = Post.objects.all()
        queryset_Comment = Comment.objects.all()
        filter = {}
        filter['slug'] =  self.kwargs['slug']
        post = get_object_or_404(queryset_Post, **filter)
        filter = {}
        filter['id'] =  self.kwargs['id']
        comment = get_object_or_404(queryset_Comment, **filter)
        if request.user in comment.downvotes.all():
            comment.downvotes.remove(request.user)
        elif not request.user in comment.upvotes.all():
            comment.downvotes.add(request.user)
        elif request.user in comment.upvotes.all():
            comment.upvotes.remove(request.user)
            comment.downvotes.add(request.user)
        serializer = CommentSerializer(comment, data= {"body" : comment.body})
        if serializer.is_valid(raise_exception=True):
            serializer.save(creator=request.user, parent=post)
        return Response({"slug": post.slug, "comment_id": comment.id, "upvote":comment.total_upvotes, "downvote": comment.total_downvotes }, status=status.HTTP_200_OK)



