from django.urls import path
from .views import ImageAnnotationAPIView
urlpatterns = [
    # path('fetch/message', FetchView.as_view(), name='fetch-message'),
    # path("send/message", SendView.as_view(), name='send-message'),
    # path("fetch/users", MessagedUsersView.as_view(), name='get-users'),
    path("image/<int:annotation_id>", ImageAnnotationAPIView.as_view(), name='get-annoations')

]