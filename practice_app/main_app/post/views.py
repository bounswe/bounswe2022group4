from django.shortcuts import render
from .models import Post
from django.contrib.auth.models import User
from django.views.generic import CreateView

# Create your views here.

def home(request):
    context = {
        'posts' : Post.objects.all()
    }
    return render(request, 'post/home.html', context)


# when the login feature is added, add loginrequiredmixin
class PostCreateView(CreateView):
    model = Post
    fields = ['title', 'content', 'location']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
