from django.forms import ModelForm
from .models import UrlSaveModel


class UrlSaveForm(ModelForm):
    class Meta:
        model = UrlSaveModel
        fields = ['the_url']
