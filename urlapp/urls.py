from django.urls import path
from .import views

urlpatterns = [
    path('home/', views.func, name='func'),
    path('search/', views.search, name='search'),
    path('new_search/', views.new_search, name='new_search'),
    path("", views.login_request, name="login"),
    path("registration/", views.Registration, name="register"),

    path('logout/', views.logout_view, name='logout'),

]
