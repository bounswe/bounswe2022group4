from django.shortcuts import render, get_object_or_404, redirect
from .models import Comment, Post
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView
from .serializers import CommentSerializer
from rest_framework import viewsets
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib import messages
from django.urls import reverse_lazy, reverse
import requests
import json
from django.http import HttpResponseRedirect, HttpResponse





def home(request):
    context = {
        'posts': Post.objects.all(),
    }
    return render(request, 'post/home.html', context)


# when the login feature is added, add loginrequiredmixin
class PostCreateView(CreateView):
    model = Post
    fields = ['title', 'content', 'location']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


# after login is implemented, LoginRequiredMixin will be added.
class PostDeleteView(UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class PostListView(ListView):
    model = Post
    template_name = 'post/home.html'
    context_object_name = 'posts'
    ordering = ['-date']
    paginate_by = 7


class PostDetailView(DetailView):
    model = Post


# after login is implemented, LoginRequiredMixin will be added.
class PostUpdateView(UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content', 'location']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class UserPostListView(ListView):
    model = Post
    template_name = 'post/user_posts.html'
    context_object_name = 'posts'
    paginate_by = 7

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=user).order_by('-date')

class CommentCreateView(CreateView):
    model = Comment
    template_name = 'post/comment_form.html'
    fields = [ 'title', 'content']

    def form_valid(self, form):
        form.instance.author = self.request.user
        form.instance.post_id = self.kwargs['pk']
        return super().form_valid(form)

class CommentViewSet(generics.ListAPIView, viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer

    def post_request(self, req):
        comment = Comment.objects.create(
            title = req.data.get('title'),
            content=req.data.get('content'), 
            author = req.data.get('author'), 
            post=req.data.get('post'))

    def get_request(self, req):
        comments = Comment.objects.all
        response = [{"title": comment.title, "content": comment.content, "author": comment.author, "post": comment.post} for comment in comments]
        return Response(data=response, status=status.HTTP_200_OK)

def bmi_calculator(req):
    weight = req.POST.get("weight", "Guest (or whatever)")
    height = req.POST.get("height", "Guest (or whatever)")
    height_int = int(height)/100

    url = "https://body-mass-index-bmi-calculator.p.rapidapi.com/metric"
    querystring = {"weight":weight,"height":str(height_int)}

    headers = {
        "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": "d74257fd79mshd06d57a0ab588b7p1484dejsn05d858f386ca"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    bmi = response.json().get('bmi')
    return render(req, 'post/bmi_calculator.html', {"bmi": bmi, "height": height, "weight":weight})

