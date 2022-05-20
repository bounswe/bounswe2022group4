from unittest import result
from django.shortcuts import render, get_object_or_404, redirect
from .models import Comment, Post,Category
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


from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse_lazy, reverse
import json
from rest_framework.decorators import api_view
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse



def CategoryPostListView(request,cats):
    
    model = Post
    template_name = 'post/category_posts.html' # <app>/<model>_<viewtype>.html
    context_object_name = 'posts'
    paginate_by = 7

    category_posts = Post.objects.filter(category=cats).order_by('-date')
    return render(request,'post/category_posts.html',{'cats':cats,'category_posts':category_posts})
#########33


def home(request):
    context = {
        'posts': Post.objects.all(),
    }

    return render(request, 'post/home.html', context)

def LikeView(request, pk):
    if request.user.is_authenticated:
        post = get_object_or_404(Post, id=request.POST.get("post_id"))
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        elif not request.user in post.dislikes.all():
            post.likes.add(request.user)
    else:
        messages.info(request, 'You have to login to like a post!')
    return HttpResponseRedirect(reverse("home-page"))

def DislikeView(request, pk):
    if request.user.is_authenticated:
        post = get_object_or_404(Post, id=request.POST.get("post_id"))
        if request.user in post.dislikes.all():
            post.dislikes.remove(request.user)
        elif not request.user in post.likes.all():
            post.dislikes.add(request.user)
    else:
        messages.info(request, 'You have to login to dislike a post!')
    return HttpResponseRedirect(reverse("home-page"))

@api_view(["GET"])
def get_likes(request, pk):
    post = get_object_or_404(Post, id=pk)
    total_likes = post.likes.count()
    response = json.dumps([{ "Post Id": pk, "Post Title": post.title, "Total Likes": total_likes }])
    return HttpResponse(response, content_type="text/json")

@api_view(["POST"])
def add_likes(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user_id = body["user_id"]
        post_id = body["post_id"]
        post = get_object_or_404(Post, id=post_id)
        user = get_object_or_404(User, id=user_id)
        post.likes.add(user)
        return HttpResponse("<h1>{} liked the '{}' titled post</h1>".format(user.username, post.title))
    post = get_object_or_404(Post, id=request.POST.get("post_id"))
    post.likes.add(request.user)
    return HttpResponseRedirect(reverse("home-page"))


    

# when the login feature is added, add loginrequiredmixin
class PostCreateView(CreateView):
    model = Post
    fields = ['title','category' ,'content', 'location']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
    def get_context_data(self,*args,**kwargs):
        cat_menu = Category.objects.all()
        context = super(PostCreateView,self).get_context_data(*args,**kwargs)
        context['cat_menu'] = cat_menu
        return context   


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
    def get_context_data(self,*args,**kwargs):
        cat_menu = Category.objects.all()
        context = super(PostListView,self).get_context_data(*args,**kwargs)
        context['cat_menu'] = cat_menu
        return context   


class PostDetailView(DetailView):
    model = Post


# after login is implemented, LoginRequiredMixin will be added.
class PostUpdateView(UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title','category', 'content', 'location']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False
    
    def get_context_data(self,*args,**kwargs):
        cat_menu = Category.objects.all()
        context = super(PostUpdateView,self).get_context_data(*args,**kwargs)
        context['cat_menu'] = cat_menu
        return context 


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

class CommentDeleteView(UserPassesTestMixin, DeleteView):
    model = Comment
    template_name = 'post/comment_confirm_delete.html'
    success_url = '/'

    def test_func(self):
        Comment = self.get_object()
        if self.request.user == Comment.author:
            return True
        return False

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
    weight = req.POST.get("weight", "1")
    height = req.POST.get("height", "1")
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


def search_disease(request):
    keyword = request.POST.get("keyword", "1")
    url = "https://disease-drug-matching.p.rapidapi.com/search_disease/"
    url += keyword

    headers = {
	"X-RapidAPI-Host": "disease-drug-matching.p.rapidapi.com",
	"X-RapidAPI-Key": "38d1716712mshaf11e3cd9abca0fp1e8420jsn3bfa267e5136"
    }

    response = requests.request("GET", url, headers=headers)


    
    response = response.json()
    resulting_diseases = list(set([x['disease'] for x in response])) 
  

    return render(request, 'post/search_disease.html', {"response": resulting_diseases, "keyword":keyword})

