from django.shortcuts import render
from .models import Post

# Create your views here.

def home(request):
    context = {
        'posts' : Post.objects.all()
    }
    return render(request, 'post/home.html', context)
