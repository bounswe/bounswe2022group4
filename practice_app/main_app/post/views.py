from django.shortcuts import render, get_object_or_404
from .models import Comment, Post
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse_lazy, reverse
import json
from rest_framework.decorators import api_view
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse

# Create your views here.


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


