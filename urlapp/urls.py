from django.urls import path
from .import views

urlpatterns = [
    path('', views.func, name='func'),
    path('search/', views.search, name='search'),
    path('new_search/', views.new_search, name='new_search'),

]
