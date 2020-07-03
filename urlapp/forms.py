from django.forms import ModelForm
from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class UrlSaveForm(ModelForm):
    class Meta:
        model = UrlSaveModel
        fields = ['the_url']


class UserSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")


class UserForm(ModelForm):
    class Meta:
        model = UsersProfile
        fields = '__all__'
        exclude = ['user']

    # def save(self, commit=True):
    #     user = super(UserSignUpForm, self).save(commit=False)
    #     user.email = self.cleaned_data["email"]
    #     if commit:
    #         user.save()
    #     return user
