from importlib import import_module
from django.shortcuts import render
#from httplib2 import Response
from yaml import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

### TODOs: input validation 
        
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
        
        response = Response()
        response.set_cookie(key="jwt", value=encoded_jwt, httponly=True)
        response.data = {
            "jwt": encoded_jwt
        }
        return response

class HomeView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        
        if not token:
            raise AuthenticationFailed("unauthenticated user!")
        
        try:
            decoded_jwt = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("jwt signature error!")

        user = User.objects.filter(id=decoded_jwt["id"]).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    ## videoda post ile yapmıştı, fark eder mi?
    def get(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message": "logout success"
        }
        return response

