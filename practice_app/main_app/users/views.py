import json
from pickle import FALSE, TRUE
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
import requests
from django.contrib import messages
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import CreateView
from .models import *
from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView
from django.http import HttpResponseRedirect, HttpResponse
import os

os.environ['current_wheather_data'] = "276027f9c2d690dfc36c80f833f0a709"
api_key = os.environ['current_wheather_data']


# Create your views here.
class RegistrationForm(UserCreationForm):
    email = forms.EmailField()  # required=True

    class Meta:
        model = User
        fields = ['username', 'email','password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)

    def clean_email(self):
        """
        Returns the email if entered email is unique otherwise gives duplicate_email error.
        """
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('duplicate_email')
        return email


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
    api_response = requests.get('http://127.0.0.1:8000/api/users/').json()
    #view = UserView()
    #users = view.get(req=request).data      This is a another way to send GET to API. I prefer to use "requests" with get function.

    return render(
        request,
        "users/ListAllUsers.html",
        {"users": api_response}
    )
class get_city_form(LoginRequiredMixin, CreateView):
    model = City
    fields = ['name']
#########33

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


def get_weather_data(request):
    city_name = request.POST["name"]

    api_response = requests.get(
        'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid='+api_key).json()

    if api_response['cod'] == '404':
        messages.success(request, f'The city for the name you entered could not be found.')
        return redirect( 'city-form')

    weather = {
        'city': city_name,
        'temperature': api_response['main']['temp'],
        'description': api_response['weather'][0]['description'],
        'icon': api_response['weather'][0]['icon'],
        'wind_speed': api_response['wind']['speed']

    }
    return render(request, 'users/city_data.html', {'weather' : weather, 'truef': TRUE})

class ProfileDetailView(DetailView):
    model = UserProfile
    template_name = 'users/profile_page.html'

    def get_object(self):
        return get_object_or_404(UserProfile, user__username=self.kwargs['username'])

class ProfileEditView(UpdateView):
    model= UserProfile
    fields = ['name', 'surname', 'city', 'country', 'bio']
    template_name = 'users/profile_edit.html'


    def get_object(self):
        
        return get_object_or_404(UserProfile, user__username=self.request.user.username)

    def test_func(self):
        profile = self.get_object()
        if self.request.user == profile.user:
            return True
        return False

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


@api_view(["GET"])
def get_all_profiles(request):
    profiles = UserProfile.objects.all()
    profiles_dict = {
        userProfile.user.username: {
            "name": userProfile.name,
            "surname": userProfile.surname, 
            "city":userProfile.city,
            "country":userProfile.country,
            "bio": userProfile.bio,
            "email": userProfile.user.email}
      for userProfile in profiles}    
    response_json = json.dumps(profiles_dict)
    return HttpResponse(response_json, content_type="text/json")

@api_view(["POST"])
def edit_profile(request):
    body_unicode = request.body.decode('utf-8')
    body:dict = json.loads(body_unicode)
    username = body.get("username")
    if username == None:
        return HttpResponse("<h1>'{}' is not a valid username.</h1>".format(username))
    profile = get_object_or_404(UserProfile, user__username=username)
    changed_list = []
    unvalid_list = []
    bool_null = False
    del body["username"]
    for name, values in body.items():
        if name in ["name","surname","city","country","bio"]:
            if values == None:
                bool_null = True
                continue
            setattr(profile,name,values)
            changed_list.append(name)
        else:
            unvalid_list.append(name)
            
    profile.save()
    
    warning_text = ""
    if bool_null:
        warning_text = "<h1>Warning: Fields can not be null!</h1> "
    if unvalid_list:
        warning_text += "<h1>Warning: {} are not valid profile fields!</h1> ".format(', '.join(map(str, unvalid_list)))
    if not changed_list:
        return HttpResponse(warning_text + "<h1> Any fields didn't change on '{}' profile. </h1>".format(username))
    return HttpResponse(warning_text + "<h1>{} has changed on '{}' profile. </h1>".format(', '.join(map(str, changed_list)), username))    


@api_view(['GET'])
def getJoke(request):
    """
    Random joke generator.
    """
    api_response=requests.get("https://v2.jokeapi.dev/joke/Any?type=twopart")
    api_response = api_response.json()
    if api_response["error"] == False:
        joke = {
            'setup' : api_response["setup"],
            'delivery' : api_response["delivery"]
        }
        return render(
            request, 'post/display_jokes.html',{'joke' : joke}
        )
    else: 
        return render({
            'status' : 'non-existent'
        },status = 404) 

@api_view(['GET'])
def get_new_face(request):
    try:
        response=requests.get("https://randomuser.me/api/")
        json_response = response.json()
    except requests.exceptions.RequestException as error:
        messages.warning(request, 'A error occured while creating your new face, please try again later.')
        return redirect('home-page') 
    pic_url = json_response["results"][0]["picture"]["large"]
        
    return render(request, 'post/new_face.html',{'pic' : pic_url}) 