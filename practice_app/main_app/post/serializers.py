from rest_framework import serializers
from .models import Comment,Category



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','title','post', 'content', 'date', 'author')



class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description')
        