from django.db import models
from django.conf import settings
from autoslug import AutoSlugField
from django.db.models.signals import pre_save
from django.utils.text import slugify
from django.shortcuts import reverse


class Post(models.Model):
    title = models.CharField(max_length=100, blank=False,null=False)
    body = models.TextField(max_length=5000, null=False, blank=False)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    slug = AutoSlugField(populate_from='title', unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.title
    
    def get_api_url(self):
        return reverse('api/post/post', kwargs={"slug": self.slug})
    
    class Meta:
        ordering = ["-created_at","-updated_at"]

    @property
    def get_comments(self):
        comments = Comment.objects.filter(parent=self)
        return comments
 

def pre_save_blog_post_reciever(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.title)

pre_save.connect(pre_save_blog_post_reciever, sender=Post)


class Comment(models.Model):
    parent = models.ForeignKey(Post, on_delete=models.CASCADE)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(max_length=2500, null=False, blank=False)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    number_of_upvotes = models.IntegerField(default=0)

    class Meta:
        ordering = ["-created_at", "-updated_at"]