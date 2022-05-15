from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
# Create your views here.
class RegistrationForm(UserCreationForm):
    email = forms.EmailField()  # required=True
    Identification_Number = forms.CharField(max_length =50)

    class Meta:
        model = User
        fields = ['username', 'email','password1', 'password2','Identification_Number']

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['Identification_Number'].help_text = 'Please, enter your ID'

def register_user(request):
    if request.method == 'POST':
        form_created = RegistrationForm(request.POST)
        if form_created.is_valid():
            form_created.save()
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')      # I will include login html for redirection
    else:
        form_created = RegistrationForm()
    return render(request, 'users/register.html', {'form': form_created})
