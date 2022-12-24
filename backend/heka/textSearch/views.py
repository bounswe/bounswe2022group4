from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from users.models import User
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer # Message Serializer Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class SearchView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def post(self,request):
        pass