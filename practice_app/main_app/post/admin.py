from django.contrib import admin

from .models import Post, Comment,Category
from django.contrib import admin

# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Category)


