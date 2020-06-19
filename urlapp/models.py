from django.db import models
from embed_video.fields import EmbedVideoField


class UrlSaveModel(models.Model):

    the_url = EmbedVideoField()

    desc = models.CharField(max_length=200)

    def __str__(self):
        return self.desc
