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



# Create your views here.


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

'''@api_view(['GET', 'POST'])
def createComment(request):
    if request.method == 'POST':
        new_comment = CommentSerializer(request.POST)
        if new_comment.is_valid():
            send_data = {'title': request.POST['title'], 'content': request.POST['content'],'author': request.POST['author'], 'post': request.POST['post']}
            requests.post('http://127.0.0.1:8000/router-view/comments-api/', data=send_data)
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('home')
    return render(request, 'post/comment_form.html', {'form': new_comment})

@api_view(['GET'])
def getUsers(request):
     view = CommentViewSet()
     comments = view.get(req=request).data
     api_response = requests.get('http://127.0.0.1:8000/router-view/comments-api/').json()
     
     return render(
         request,
         "users/ListAllUsers.html",
         {"users": users}
     )
         {"users": api_response}
     )'''

'''def CommentView(request, pk):
    if request.user.is_authenticated:
         post = get_object_or_404(Post, id=request.POST.get("post_id"))
         post.comments.add(request.user)
    else:
         messages.info(request, 'You have to login to comment on a post!')
    return HttpResponseRedirect(reverse("home-page"))

@api_view(["GET"])
def get_likes(request, pk):
     post = get_object_or_404(Post, id=pk)
     total_likes = post.likes.count()
     response = json.dumps([{"Post Title": comment.title, "Total Likes": total_likes }])
     return HttpResponse(response, content_type="text/json") '''