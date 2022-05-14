from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)   # the date and time when the post is created.
    author = models.ForeignKey(User, on_delete=models.CASCADE) # if the user is deleted,their post will also be deleted.

    def __str__(self):
        return self.title

