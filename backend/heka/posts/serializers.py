import os
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import  Post, Comment

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model	= Post
		fields	= ['title', 'body','slug']
		lookup_field = 'slug'

	def fetch_email(self, post):
		return post.creator.email

	def fetch_slug(self, post):
		return post.slug
		

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["body"]
	