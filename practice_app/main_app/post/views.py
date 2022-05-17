from django.shortcuts import render, get_object_or_404
from .models import Post
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse

# Create your views here.


def home(request):
    context = {
        'posts': Post.objects.all(),
    }   
    return render(request, 'post/home.html', context)

def LikeView(request, pk):
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
