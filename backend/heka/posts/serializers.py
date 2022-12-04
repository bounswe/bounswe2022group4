import os
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import  Post, Comment

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model	= Post
		fields	= ['category','title', 'body','slug', 'image', 'location']
		lookup_field = 'slug'

	def fetch_email(self, post):
		return post.creator.email

	def fetch_slug(self, post):
		return post.slug
	
	def fetch_creator_username(self, post):
		return post.creator.username

	def fetch_last_update(self, post):
		format = '%d-%m-%Y %H:%M:%S'
		return post.updated_at.strftime(format)
	
	def fetch_upvotes_downvotes(self, post):
		return  {"upvote" : post.total_upvotes, "downvote" : post.total_downvotes}
			

class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ["body"]

	def fetch_creator_username(self, post):
		return post.creator.username

	def fetch_last_update(self, post):
		format = '%d-%m-%Y %H:%M:%S'
		return post.updated_at.strftime(format)

	def fetch_upvotes_downvotes(self, post):
		return  {"upvote" : post.total_upvotes, "downvote" : post.total_downvotes}

		
	