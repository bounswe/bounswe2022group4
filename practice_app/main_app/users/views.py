from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
# Create your views here.
class RegistrationForm(UserCreationForm):
    email = forms.EmailField()  # required=True

    class Meta:
        model = User
        fields = ['username', 'email','password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)

class UserView(generics.ListAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, req):

        user = User.objects.create_user(username=req.data.get('username'),email=req.data.get('email'),
                                        password=req.data.get('password'))
        data ={'username': req.data.get('username'), 'email': req.data.get('email'), 'password':req.data.get('password') }
        return Response(data=data, status=status.HTTP_201_CREATED)



    def get(self, req):
        users = User.objects.all()
        response = [{ "username": user.username, "email": user.email } for user in users]
        return Response(data=response, status=status.HTTP_200_OK)



@api_view(['GET', 'POST'])
def register_user(request):
    if request.method == 'POST':
        form_created = RegistrationForm(request.POST)
        if form_created.is_valid():
            view = UserView()
            response = view.post(req=request)
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')      # I  included login html for redirection
    else:
        form_created = RegistrationForm()
    return render(request, 'users/register.html', {'form': form_created})


@api_view(['GET'])
def getUsers(request):
    view = UserView()
    users = view.get(req=request).data

    return render(
        request,
        "users/ListAllUsers.html",
        {"users": users}
    )