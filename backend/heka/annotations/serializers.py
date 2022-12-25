from rest_framework import serializers

from .models import ImageAnnotation


class ImageAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageAnnotation
        fields = ['id', 'post_slug', 'json']