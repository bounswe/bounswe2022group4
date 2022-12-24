from django.shortcuts import render
#from django.http.response import JsonResponse,
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from users.models import User
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer # Message Serializer Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchHeadline

class SearchUserView(APIView):
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def get(self,request):
        qs = User.objects.all()
        query = request.GET.get("query")
        if query:
            qs = User.objects.filter(username__contains=query)
            
            response_data = {}
            response_data[f'users'] = {}
            if qs:
                response_data[f'users']["error"] = False
                for i in range(len(qs)):
                    response_data[f'users'][f"user_{i}"] = {}
                    response_data["users"][f"user_{i}"]['username'] = qs[i].username
                    response_data["users"][f"user_{i}"]['email'] = qs[i].email
            else:
                response_data[f'users']["error"] = True
                response_data[f'users']["message"] = "No user found with this query input!"
            return JsonResponse(response_data, safe=False)
