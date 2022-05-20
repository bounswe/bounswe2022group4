from rest_framework import serializers

from .models import Comment,Category, Post



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','title','post', 'content', 'date', 'author')



class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description')
        
