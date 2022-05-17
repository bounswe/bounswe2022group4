
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
import requests
from django.contrib import messages
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
from rest_framework import viewsets

# Create your views here.
class RegistrationForm(UserCreationForm):
    email = forms.EmailField()  # required=True

    class Meta:
        model = User
        fields = ['username', 'email','password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)

#I create a user view to provide post method. It has post and get methods. (for API)
class UserView(generics.ListAPIView,viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, req):
        user = User.objects.create_user(username=req.data.get('username'), email=req.data.get('email'),
                                        password=req.data.get('password1'))

        data = {'username': req.data.get('username'), 'email': req.data.get(
            'email'), 'password': req.data.get('password1')}
        return Response(data=data, status=status.HTTP_201_CREATED)

    def get(self, req):
        users = User.objects.all()
        response = [{"username": user.username, "email": user.email} for user in users]
        return Response(data=response, status=status.HTTP_200_OK)
# To create a user using API.
@api_view(['GET', 'POST'])
def register_user(request):
    if request.method == 'POST':
        form_created = RegistrationForm(request.POST)
        if form_created.is_valid():
            view = UserView()       #I prefer send post request to api to provide hashing password in that way.
            response = view.post(req=request)
            # This is another way to post user to API. I think that both can be used.
            #dict = {'username': request.POST['username'], 'email': request.POST['email'],'password': request.POST['password1']}
            #requests.post('http://127.0.0.1:8000/api2/users/', data=dict)
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')      # I  included login html for redirection
    else:
        form_created = RegistrationForm()
    return render(request, 'users/register.html', {'form': form_created})

#To get all users from API.
@api_view(['GET'])
def getUsers(request):
    api_response = requests.get('http://127.0.0.1:8000/api2/users/').json()
    #view = UserView()
    #users = view.get(req=request).data      This is a another way to send GET to API. I prefer to use "requests" with get function.

    return render(
        request,
        "users/ListAllUsers.html",
        {"users": api_response}
    )