from django.shortcuts import render
#from django.http.response import JsonResponse,
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from users.models import User
from posts.models import Post
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer # Message Serializer Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchHeadline, SearchRank

class SearchUserView(APIView):
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def get(self,request):
        query = request.GET.get("query")
        
        response_data = {}
        response_data[f'users'] = {}
        
        if query:
            qs = User.objects.filter(username__contains=query).order_by("id")
            
            if qs:
                response_data[f'users']["error"] = False
                response_data[f'users']["count"] = len(qs)
                for i in range(len(qs)):
                    response_data[f'users'][f"user_{i+1}"] = {}
                    response_data["users"][f"user_{i+1}"]['id'] = qs[i].id
                    response_data["users"][f"user_{i+1}"]['username'] = qs[i].username
                    response_data["users"][f"user_{i+1}"]['email'] = qs[i].email
            else:
                response_data[f'users']["error"] = True
                response_data[f'users']["count"] = 0
                response_data[f'users']["message"] = "No user found with this query input!"
            return JsonResponse(response_data, safe=False)
        else:
            response_data[f'users']["error"] = True
            response_data[f'users']["count"] = 0
            response_data[f'users']["message"] = "No query input supplied!"
            return JsonResponse(response_data, safe=False)

class SearchPostView(APIView):
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def get(self,request):
        query = request.GET.get("query")
        query_list = query.split()
        #for i in range
        response_data = {}
        response_data[f'posts'] = {}
        
        if query:
            vector = SearchVector('title', 'body')
            q = SearchQuery(query)
            qs = Post.objects.annotate(rank=SearchRank(vector, q)).filter(rank__gte=0.001).order_by("-rank")
            #qs = Post.objects.filter(title__icontains=query).order_by("id")
            
            if qs:
                response_data[f'posts']["error"] = False
                response_data[f'posts']["count"] = len(qs)
                for i in range(len(qs)):
                    response_data[f'posts'][f"post_{i+1}"] = {}
                    response_data["posts"][f"post_{i+1}"]['id'] = qs[i].id
                    response_data["posts"][f"post_{i+1}"]['title'] = qs[i].title
                    response_data["posts"][f"post_{i+1}"]['body'] = qs[i].body
                    response_data["posts"][f"post_{i+1}"]['creator'] = qs[i].creator.username
                    response_data["posts"][f"post_{i+1}"]['created_at'] = qs[i].created_at
            else:
                response_data[f'posts']["error"] = True
                response_data[f'posts']["count"] = 0
                response_data[f'posts']["message"] = "No post found with this query input!"
                pass
        else:
            response_data[f'posts']["error"] = True
            response_data[f'posts']["count"] = 0
            response_data[f'posts']["message"] = "No query input supplied!"
            pass
        return JsonResponse(response_data, safe=False)
