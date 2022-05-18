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

    likes = models.ManyToManyField(User, related_name="blog_post")
<<<<<<< Updated upstream
=======
    
    dislikes = models.ManyToManyField(User, related_name="blog_post")
>>>>>>> Stashed changes

    @property
    def total_likes(self):
        return self.likes.count()
<<<<<<< Updated upstream
=======
    
    @property
    def total_dislikes(self):
        return self.dislikes.count()
>>>>>>> Stashed changes

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('post-detail', kwargs={'pk':self.pk})

