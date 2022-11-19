from rest_framework.exceptions import AuthenticationFailed
from .models import User
from drf_yasg.utils import swagger_auto_schema 
from drf_yasg import openapi
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import AnonymousUser


class RegisterView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(request_body = UserSerializer, response=UserSerializer) 
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            token = Token.objects.get_or_create(user=user)[0].key
            return Response(data = {'message':'Registration succesful!', 'email':user.email, 'token':token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
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
            raise AuthenticationFailed("User not found!")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password!")
       
        if not isinstance(request.user,AnonymousUser):
            return Response(data={'message':'Already logged in', 'token':Token.objects.get_or_create(user=user)[0].key}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = Token.objects.get(user=user)
        except Token.DoesNotExist:
            user = authenticate(username=email, password=password)
            token = Token.objects.get_or_create(user=user)[0].key
            login(request, user)
            return  Response( {'message':'Login succesful!', 'email':email, 'token':token}, status=status.HTTP_200_OK)
        else:
            return Response(data = {'message':'Already logged in!', 'email':email, 'token': Token.objects.get_or_create(user=user)[0].key })
        
      

class HomeView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    @swagger_auto_schema() 
    def get(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
            token = Token.objects.get(user=user)
        except:
            return Response( data = {'status':'Guest User'}, status=status.HTTP_200_OK)
        
        return Response(data = {'status':'Registered User', 'email':user.email, 'token': Token.objects.get_or_create(user=user)[0].key},
                status = status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication] 
    @swagger_auto_schema() 
    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(data = {'message':'Logout succesful!'}, status = status.HTTP_200_OK)

