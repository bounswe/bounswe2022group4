from django.urls import path, include
from .views import *


urlpatterns = [
    path('user/<username>', ProfileDetailView.as_view(), name='user-page'),
    path('edit-profile/', ProfileEditView.as_view(), name='profile-edit'),
    path('api/edit-profile/', edit_profile, name='profile-edit-api'),
    path('api/all-profiles/', get_all_profiles, name='all-profile-api'),
]
