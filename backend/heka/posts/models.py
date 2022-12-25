from django.db import models
from django.conf import settings
from autoslug import AutoSlugField
from django.db.models.signals import pre_save
from django.utils.text import slugify
from django.shortcuts import reverse


class Post(models.Model):
    category = models.CharField(null=False, blank=False, max_length=100)
    title = models.CharField(max_length=100, blank=False,null=False)
    body = models.TextField(max_length=5000, null=False, blank=False)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    slug = AutoSlugField(populate_from='title', unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    last_update = models.DateTimeField(auto_now=False, auto_now_add=True)
    upvotes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="post_upvotes")
    downvotes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="post_downvotes")
    
    image = models.CharField(max_length=9000000, null=True, blank=True)
    location = models.CharField(max_length = 300, null=True, blank=True)

    @property
    def total_upvotes(self):
        return int(self.upvotes.count())

    @property
    def total_downvotes(self):
        return int(self.downvotes.count())

    def __str__(self):
        return self.title
    
    def set_last_update(self):
        self.last_update = self.updated_at
    
    def get_api_url(self):
        return reverse('api/post/post', kwargs={"slug": self.slug})

    def upvotes_for_sorting(self):
        return int(self.upvotes.count())

    def comments_for_sorting(self):
        comment_count = Comment.objects.filter(parent=self).count()
        return int(comment_count)

    class Meta:
        ordering = ["-created_at","-updated_at"]

    @property
    def get_comments(self):
        comments = Comment.objects.filter(parent=self).order_by("created_at")
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
    last_update = models.DateTimeField(auto_now=False, auto_now_add=True)
    upvotes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="comment_upvotes")
    downvotes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="comment_downvotes")
    
    class Meta:
        ordering = ["-created_at", "-updated_at"]
    
    @property
    def total_upvotes(self):
        return self.upvotes.count()

    @property
    def total_downvotes(self):
        return self.downvotes.count()
    
    def set_last_update(self):
        self.last_update = self.updated_at
    