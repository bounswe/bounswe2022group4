from rest_framework import serializers

from .models import ImageAnnotation, TextAnnotation


class ImageAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageAnnotation
        fields = ['id', 'post_slug', 'json']


class TextAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAnnotation
        fields = ['id', 'post_slug', 'json']