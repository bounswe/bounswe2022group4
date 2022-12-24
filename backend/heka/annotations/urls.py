from django.urls import path
from .views import ImageAnnotationAPIView, PostImageAnnotationAPIView

urlpatterns = [
    path("image/<int:annotation_id>", ImageAnnotationAPIView.as_view(), name='get-annotations'),
    path("image/post/<string:post_slug>", PostImageAnnotationAPIView.as_view(), name='get-post-annotations'),
]