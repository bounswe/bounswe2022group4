from django.urls import path, include
from .views import *


urlpatterns = [
    path('user/<username>', ProfileDetailView.as_view(), name='user-page'),
    path('edit-profile/', ProfileEditView.as_view(), name='profile-edit'),
]
