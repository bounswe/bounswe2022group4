from django.urls import path
from .views import ImageAnnotationAPIView, PostImageAnnotationAPIView, TextAnnotationAPIView, PostTextAnnotationAPIView

urlpatterns = [
    path("image/<int:annotation_id>", ImageAnnotationAPIView.as_view(), name='get-annotations'),
    path("image/post/<str:post_slug>", PostImageAnnotationAPIView.as_view(), name='get-post-annotations'),
    path("text/<int:annotation_id>", TextAnnotationAPIView.as_view(), name='get-text-annotations'),
    path("text/post/<str:post_slug>", PostTextAnnotationAPIView.as_view(), name='get-text-post-annotations'),
]