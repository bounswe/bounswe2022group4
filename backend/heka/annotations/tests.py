from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

from .views import ImageAnnotationAPIView, PostImageAnnotationAPIView, TextAnnotationAPIView, PostTextAnnotationAPIView
from .models import ImageAnnotation

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

        self.test_anno =ImageAnnotation.objects.create(**self.data)

    def test_get_image_anno(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=self.test_anno.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["type"], self.data['json']['type'])
    def test_get_image_anno_bad_request(self):
        request = self.factory.get(self.url)
        response = self.view(request, annotation_id=78)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    # def test_put_profile_page(self):
    #     data = {
    #         "email": "melih@gmail.com",
    #         "username": "kadir",
    #         "is_expert": False,
    #         "date_joined": "2022-12-04T12:07:36.293874Z",
    #         "is_admin": False,
    #         "age": 4,
    #         "name": "melih aktas",
    #         "last_login": "2022-12-04T12:10:24.743456Z",
    #         "profile_image": None
    #     }
    #
    #     request = self.factory.put(self.url, data, format="json")
    #
    #     force_authenticate(request, user=self.test_user)
    #     response = self.view(request, username="melih")
    #
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data["username"], data["username"])
    #     self.assertEqual(response.data["age"], data["age"])
