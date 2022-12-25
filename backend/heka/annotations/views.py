from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ImageAnnotationSerializer, TextAnnotationSerializer
from .models import ImageAnnotation, TextAnnotation
import json

# Create your views here.

class ImageAnnotationAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200:ImageAnnotationSerializer(many=True)})
    def get(self, request, annotation_id=None):
        annotation = ImageAnnotation.objects.get(pk=annotation_id)
        serializer = ImageAnnotationSerializer(annotation)
        return Response(serializer.data["json"], status=status.HTTP_200_OK)

class PostImageAnnotationAPIView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses={200:ImageAnnotationSerializer(many=True)})
    def get(self, request, post_slug=None):
        annotation = ImageAnnotation.objects.filter(post_slug=post_slug)
        serializer = ImageAnnotationSerializer(annotation, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(responses={201:ImageAnnotationSerializer})
    def post(self, request, post_slug=None):
        default_url = request.build_absolute_uri()
        default_w3c_template = {
            "@context": "http://www.w3.org/ns/anno.jsonld",
            "id": "http://example.org/anno20",
            "type": "Annotation",
            "body": {
                "type" : "TextualBody",
                "value" : "<p>example!</p>",
                "format" : "text/html",
                "language" : "en"
            },
            "target": {
                "source": "http://example.org/post-slug",
                "selector": {
                    "type": "FragmentSelector",
                    "conformsTo": "http://www.w3.org/TR/media-frags/",
                    "value": "xywh=50,50,640,480"
                }
            }
        }
        try:
            anno = ImageAnnotation(post_slug=post_slug, json=default_w3c_template)
            anno.save()

            geometry = request.data["geometry"]
            xywh_value = f'xywh={geometry["x"]},{geometry["y"]},{geometry["width"]},{geometry["height"]}'

            default_w3c_template["id"] = default_url.split("post")[0] + str(anno.id)
            default_w3c_template["body"]["value"] = request.data["data"]["text"]
            default_w3c_template["target"]["source"] = request.data["data"]["source"]
            default_w3c_template["target"]["selector"]["value"] = xywh_value

            anno.json = default_w3c_template
            serializer = ImageAnnotationSerializer(anno)
            anno.save()

            return Response(serializer.data["json"], status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TextAnnotationAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200:TextAnnotationSerializer(many=True)})
    def get(self, request, annotation_id=None):
        annotation = TextAnnotation.objects.get(pk=annotation_id)
        serializer = TextAnnotationSerializer(annotation)
        return Response(serializer.data["json"], status=status.HTTP_200_OK)

class PostTextAnnotationAPIView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(responses={200:TextAnnotationSerializer(many=True)})
    def get(self, request, post_slug=None):
        annotation = TextAnnotation.objects.filter(post_slug=post_slug)
        serializer = TextAnnotationSerializer(annotation, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(responses={201:TextAnnotationSerializer})
    def post(self, request, post_slug=None):
        default_url = request.build_absolute_uri()
        default_w3c_template = {
            "@context": "http://www.w3.org/ns/anno.jsonld",
            "id": "http://example.org/anno20",
            "type": "Annotation",
            "body": {
                "type": "TextualBody",
                "value": "<p>example!</p>",
                "format": "text/html",
                "language": "en"

            },
            "target": {
                "source": "http://example.org/post-slug",
                "selector": {
                    "type": "TextPositionSelector",
                    "start": 412,
                    "end": 795
                }
            }
        }

        try:
            anno = TextAnnotation(post_slug=post_slug, json=default_w3c_template)
            anno.save()

            position = request.data["position"]

            default_w3c_template["id"] = default_url.split("post")[0] + str(anno.id)
            default_w3c_template["body"]["value"] = request.data["data"]["text"]
            default_w3c_template["target"]["source"] = request.data["data"]["source"]

            default_w3c_template["target"]["selector"]["start"] = position["start"]
            default_w3c_template["target"]["selector"]["end"] = position["end"]

            anno.json = default_w3c_template
            serializer = TextAnnotationSerializer(anno)
            anno.save()

            return Response(serializer.data["json"], status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.exception(e)
            return Response("Wrong request body", status=status.HTTP_400_BAD_REQUEST)
