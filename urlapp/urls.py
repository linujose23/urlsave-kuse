from django.urls import path
from .import views

urlpatterns = [
    path('', views.show_thumnails, name='thumbs'),
    path('search/', views.search, name='search'),
    path('new_search/', views.new_search, name='new_search'),
    path("save/", views.func, name="func"),
    path('signup/', views.signup_request, name='signup'),

    path('logout/', views.logout_view, name='logout'),

]
