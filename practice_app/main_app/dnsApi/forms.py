from django import forms

class DomainForm(forms.Form):
    domain = forms.CharField()
