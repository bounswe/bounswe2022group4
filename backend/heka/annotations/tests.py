from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

from .views import ImageAnnotationAPIView, PostImageAnnotationAPIView, TextAnnotationAPIView, PostTextAnnotationAPIView
from .models import ImageAnnotation, TextAnnotation


# Create your tests here.
class ImageAnnotationTestCase(APITestCase):
    databases = '__all__'

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ImageAnnotationAPIView.as_view()
        self.url = "/api/annotation/image"

        self.data = {
            "post_slug": "melih",
            "json": {
                "id": "http://3.72.25.175:8080/api/annotation/image/1",
                "body": {
                    "type": "TextualBody",
                    "value": "num",
                    "format": "text/html",
                    "language": "en"
                },
                "type": "Annotation",
                "target": {
                    "source": "http://3.72.25.175:3000/deneme",
                    "selector": {
                        "type": "FragmentSelector",
                        "value": "xywh=4.25531914893617,2.3482142857142856,13.191489361702128,44.857142857142854",
                        "conformsTo": "http://www.w3.org/TR/media-frags/"
                    }
                },
                "@context": "http://www.w3.org/ns/anno.jsonld"
            },
        }

        self.test_anno = ImageAnnotation.objects.create(**self.data)

    def test_get_image_anno(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=self.test_anno.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["type"], self.data['json']['type'])

    def test_get_image_anno_bad_request(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=78)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PostImageAnnotationTestCase(APITestCase):
    databases = '__all__'

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PostImageAnnotationAPIView.as_view()
        self.url = "/api/annotation/image/post"
        self.post_slug = "test_slug"
        self.data = {
            "geometry": {
                "x": 76,
                "y": 27,
                "width": 14,
                "height": 32
            },
            "data": {
                "text": "text for test",
                "source": "http://source"
            }
        }

    def test_post_image_anno(self):
        request = self.factory.post(self.url, self.data, format="json")
        response = self.view(request, post_slug=self.post_slug)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_post_image_anno(self):
        self.data = {
            "post_slug": self.post_slug,
            "json": {
                "id": "http://3.72.25.175:8080/api/annotation/image/1",
                "body": {
                    "type": "TextualBody",
                    "value": "num",
                    "format": "text/html",
                    "language": "en"
                },
                "type": "Annotation",
                "target": {
                    "source": "http://3.72.25.175:3000/deneme",
                    "selector": {
                        "type": "FragmentSelector",
                        "value": "xywh=4.25531914893617,2.3482142857142856,13.191489361702128,44.857142857142854",
                        "conformsTo": "http://www.w3.org/TR/media-frags/"
                    }
                },
                "@context": "http://www.w3.org/ns/anno.jsonld"
            },
        }
        ImageAnnotation.objects.create(**self.data)
        ImageAnnotation.objects.create(**self.data)

        request = self.factory.get(self.url, post_slug=self.post_slug)
        response = self.view(request, post_slug=self.post_slug)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # checks if it creates and returns 2 annotations
        self.assertEqual(len(response.data), 2)


class TextAnnotationTestCase(APITestCase):
    databases = '__all__'

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = TextAnnotationAPIView.as_view()
        self.url = "/api/annotation/text"

        self.data = {
            "post_slug": "melih",
            "json": {
                "id": "http://3.72.25.175:8080/api/annotation/text/1",
                "body": {
                    "type": "TextualBody",
                    "value": "test_text",
                    "format": "text/html",
                    "language": "en"
                },
                "type": "Annotation",
                "target": {
                    "source": "http://example.org/post-slug1313",
                    "selector": {
                        "end": 57,
                        "type": "TextPositionSelector",
                        "start": 31
                    }
                },
                "@context": "http://www.w3.org/ns/anno.jsonld"
            }
        }
        self.test_anno = TextAnnotation.objects.create(**self.data)

    def test_get_text_anno(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=self.test_anno.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["type"], self.data['json']['type'])

    def test_get_text_anno_bad_request(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=78)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PostTextAnnotationTestCase(APITestCase):
    databases = '__all__'

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PostTextAnnotationAPIView.as_view()
        self.url = "/api/annotation/text/post"
        self.post_slug = "test_slug"
        self.data = {
            "position": {
                "start": 31,
                "end": 57
            },
            "data": {
                "text": "test_text",
                "source": "http://example.org/post-slug1313"
            }
        }

    def test_post_text_anno(self):
        request = self.factory.post(self.url, self.data, format="json")
        response = self.view(request, post_slug=self.post_slug)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_post_image_anno(self):
        self.data = {
            "post_slug": self.post_slug,
            "json": {
                "id": "http://3.72.25.175:8080/api/annotation/text/1",
                "body": {
                    "type": "TextualBody",
                    "value": "test_text",
                    "format": "text/html",
                    "language": "en"
                },
                "type": "Annotation",
                "target": {
                    "source": "http://example.org/post-slug1313",
                    "selector": {
                        "end": 57,
                        "type": "TextPositionSelector",
                        "start": 31
                    }
                },
                "@context": "http://www.w3.org/ns/anno.jsonld"
            }
        }
        self.object_count = 3
        for _ in range(self.object_count):
            TextAnnotation.objects.create(**self.data)

        request = self.factory.get(self.url, post_slug=self.post_slug)
        response = self.view(request, post_slug=self.post_slug)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # checks if it creates and returns 3 annotations
        self.assertEqual(len(response.data), self.object_count)
