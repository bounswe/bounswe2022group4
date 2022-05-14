from django.shortcuts import render

# Create your views here.

posts = [
    {
        'title' : 'Post 1',
        'author' : 'Sanberk',
        'body' : 'This is the first post.',
        'date' : '14/05/2022'
    },
    {
        'title': 'Post 2',
        'author': 'Sanberk',
        'body' : 'This is the second post.',
        'date': '14/05/2022'
    }
]

def home(request):
    context = {
        'posts' : posts
    }
    return render(request, 'post/home.html', context)
