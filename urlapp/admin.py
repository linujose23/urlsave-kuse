from django.contrib import admin
from .models import UrlSaveModel, PludoUsersProfile
from .forms import UrlSaveForm
# Register your models here.


admin.site.register(UrlSaveModel)
admin.site.register(PludoUsersProfile)
