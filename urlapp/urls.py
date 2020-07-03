from django.urls import path
from .import views

urlpatterns = [
    path('thumbs/', views.show_thumbnails, name='thumbs'),
    path('search/', views.search, name='search'),
    path('new_search/', views.new_search, name='new_search'),
    path("save/", views.func, name="func"),
    path("account/", views.account, name="account"),

    path('signup/', views.signup_request, name='signup'),
    path('', views.login_request, name='login'),
    path('logout/', views.logout_view, name='logout'),

]
