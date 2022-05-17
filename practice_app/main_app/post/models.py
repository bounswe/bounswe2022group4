from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    location = models.CharField(default='not specified', max_length=100)
    date = models.DateTimeField(default=timezone.now)   # the date and time when the post is created.
    author = models.ForeignKey(User, on_delete=models.CASCADE) # if the user is deleted,their post will also be deleted.

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('post-detail', kwargs={'pk':self.pk})

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)   # the date and time when the post is created.
    author = models.ForeignKey(User, on_delete=models.CASCADE) # if the user is deleted,their post will also be deleted.
    def __str__(self):
        return '%s - %s - %s - %s' % (self.title, self.content, self.date, self.author)
    def get_absolute_url(self):
        return reverse('home-page')