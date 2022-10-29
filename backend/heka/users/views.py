from importlib import import_module
from django.shortcuts import render
from requests import request
#from httplib2 import Response
from yaml import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime
from drf_yasg.utils import swagger_auto_schema 
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import status

#@swagger_auto_schema(methods=['post',],request_body=UserSerializer )
class RegisterView(APIView):
    @swagger_auto_schema(request_body = UserSerializer, response=UserSerializer) #manual_parameters=parameters)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    login_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    },
    required=['email', 'password']
    )
    @swagger_auto_schema(request_body = login_schema)
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found!")
        if not user.check_password(password):
            raise AuthenticationFailed("incorrect password")
        
        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        encoded_jwt = jwt.encode(payload, "secret", algorithm="HS256")
        
        response = Response(status=status.HTTP_200_OK)
        response.set_cookie(key="jwt", value=encoded_jwt, httponly=True)
        response.data = {
            "jwt": encoded_jwt
        }
        return response

class HomeView(APIView):
    parameters=[]
    parameters.append(openapi.Parameter('jwt', in_ = 'cookie', type=openapi.TYPE_STRING))
    @swagger_auto_schema(manual_parameters=parameters) 
    def get(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("unauthenticated user!")
        
        try:
            decoded_jwt = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("jwt-error!")

        user = User.objects.filter(id=decoded_jwt["id"]).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    parameters=[]
    parameters.append(openapi.Parameter('jwt', in_ = 'cookie', type=openapi.TYPE_STRING))
    @swagger_auto_schema(manual_parameters=parameters) 
    def get(self, request):
        response = Response()         
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("unauthenticated user!")
        response.delete_cookie("jwt")
        response.data = {
            "message": "logout success"
        }
        return response

