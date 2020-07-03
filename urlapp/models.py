from django.db import models
from embed_video.fields import EmbedVideoField
from django.contrib.auth.models import User
from django.db import models


class UrlSaveModel(models.Model):

    the_url = EmbedVideoField()

    desc = models.CharField(max_length=200)

    def __str__(self):
        return self.desc


class UsersProfile(models.Model):
    user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.CASCADE)
    profile_pic = models.ImageField(
        default='blank-profile-picture.png', null=True, blank=True)
    name = models.CharField(max_length=150, null=True)
    desc = models.CharField(max_length=250, null=True)
    email = models.EmailField()
    date_created = models.DateTimeField(auto_now_add=True, null=False)

    def __str__(self):
        return str(self.user)
