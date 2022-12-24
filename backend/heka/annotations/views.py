from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ImageAnnotationSerializer
from .models import ImageAnnotation
import json

# Create your views here.

class ImageAnnotationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema()
    def get(self, request, annotation_id=None):
        temp = ImageAnnotation(post_slug="melih", json={"melih":"True"})
        temp.save()

        annotation = ImageAnnotation.objects.get(pk=annotation_id)
        serializer = ImageAnnotationSerializer(annotation)

        print(serializer, type(serializer))
        return Response(serializer.data, status=status.HTTP_200_OK)
