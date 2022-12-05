from rest_framework.exceptions import AuthenticationFailed
from .models import User
from drf_yasg.utils import swagger_auto_schema 
from drf_yasg import openapi
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import User
from .serializers import UserSerializer, ProfilePageSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.core.mail import send_mail



class RegisterView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(request_body = UserSerializer, response=UserSerializer) 
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            #token = Token.objects.get_or_create(user=user)[0].key
            return Response(data = {'message':'Registration succesful!', 'email':user.email,
                                    'username':user.username}, status=status.HTTP_201_CREATED)
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
       
        try:
            token = Token.objects.get(user=user)
        except Token.DoesNotExist:
            user = authenticate(username=email, password=password)
            token = Token.objects.get_or_create(user=user)[0].key
            login(request, user)
            return  Response( {'message':'Login succesful!', 'email':email,
                               'username':user.username, 'token':token}, status=status.HTTP_200_OK)
        else:
            return Response(data = {'message':'Already logged in!', 'email':email, 'username':user.username,
                                    'token': Token.objects.get_or_create(user=user)[0].key })
        
      

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
        
        return Response(data = {'status':'Registered User', 'email':user.email, 'username':user.username,'token': Token.objects.get_or_create(user=user)[0].key},
                status = status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication] 
    @swagger_auto_schema() 
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(data = {'message':'Logout succesful!'}, status = status.HTTP_200_OK)


class SearchUserAPIView(APIView):
    """
    post:
        Searches for a user by username. 
    """
    permission_classes = [AllowAny]
    @swagger_auto_schema()
    def post(self, request, *args, **kwargs):
        filter = {}
        keyword =  self.kwargs['keyword']
        qs_username= User.objects.all().filter(username__contains = keyword).order_by("username")
        users = []
        for user in qs_username:
            response = {}
            serializer = UserSerializer(user, data={"email": user.email, "username": user.username, "password": user.password, "is_expert": user.is_expert})
            if serializer.is_valid(raise_exception=True):
                response.update(serializer.fetch_user_info(user))
                users.append(response)
        return Response(users, status=status.HTTP_200_OK)


class ProfilePageView(APIView):
    permission_classes = [IsAuthenticated]

    get_profile_page = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        properties = {'username': openapi.Schema(type=openapi.TYPE_STRING, description='string')},
        required = ['username'],
    )
    @swagger_auto_schema(response = ProfilePageSerializer)
    def get(self, request, username=None):
        #username = request.data["username"]
        try:
            user = Token.objects.get(key=request.auth.key).user
            token = Token.objects.get(user=user)
        except:
            return Response(data={'status': 'Invalid User'}, status=status.HTTP_400_BAD_REQUEST)

        profilepage_user = User.objects.get(username=username)
        serializer = ProfilePageSerializer(profilepage_user)
        return Response(data=serializer.data , status=status.HTTP_200_OK)
        
    @swagger_auto_schema(request_body=ProfilePageSerializer, response=ProfilePageSerializer)
    def put(self, request, username=None):
        try:
            user = Token.objects.get(key=request.auth.key).user
            token = Token.objects.get(user=user)
        except:
            return Response(data={'status': 'Invalid User'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        profilepage_user = User.objects.get(username=username)
        serializer = ProfilePageSerializer(profilepage_user, data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
class ForgetPasswordView(APIView):
    @swagger_auto_schema() 
    def post(self, request):
        email = request.data["email"]
        try:
            user = User.objects.get(email=email)

            subject = 'HEKA - Reset Password!'
            message = f'Hi {user.username}, your code is {111111 + user.id}. You can create new password using this code.'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [user.email, ]
            send_mail( subject, message, email_from, recipient_list )
        except:
            return Response(data={'status': 'Invalid User'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'status': 'Email sent to your mail address'}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    @swagger_auto_schema() 
    def post(self, request):
        code = request.data["code"]
        new_password = request.data["new_password"]
        confirm_new_password = request.data["confirm_new_password"]
        if(new_password != confirm_new_password):
            return Response(data={'status': 'new password should be match'}, status=status.HTTP_200_OK)    
        else:
            user_id = int(code) - 111111

            user = User.objects.get(id=user_id)
            user.set_password(new_password)
            user.save()
            return Response(data={'status': 'password is updated'}, status=status.HTTP_200_OK)
