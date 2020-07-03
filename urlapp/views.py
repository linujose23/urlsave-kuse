from django.contrib.auth import logout
from django.shortcuts import render
from .models import UrlSaveModel, UsersProfile
from .forms import UrlSaveForm
from django.http import HttpResponse
import lxml
from lxml import etree
from urllib.request import urlopen
from django.contrib import messages
from urllib.parse import urlparse
from urllib.parse import parse_qs
from urllib.parse import parse_qsl
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .forms import UserSignUpForm
from django.shortcuts import HttpResponseRedirect
from pytube import YouTube
from django.contrib import messages
from .models import *
from .decorators import unauthenticated_user, allowed_users, admin_only
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from .forms import *


# Create your views here.


def signup_request(request):

    if request.user.is_authenticated:
        return redirect('account')

    else:

        form = UserSignUpForm()

        if request.method == 'POST':

            form = UserSignUpForm(request.POST)

            if form.is_valid():

                print('signup form is valid!')

                usr = form.save()
                group = None

                username = form.cleaned_data.get('username')
                group = Group.objects.get(name='user')
                usr.groups.add(group)
                UsersProfile.objects.create(user=usr,)

                messages.success(
                    request, 'Account was sucessfully created for ' + username)

                return redirect('login')

        context = {'form': form}

        return render(request, 'signup_dummy.html', context)


def login_request(request):

    if request.user.is_authenticated:
        return redirect('account')

    else:

        if request.method == 'POST':
            print('login_request')
            form = AuthenticationForm(request=request, data=request.POST)
            print('r', request.POST['username'])
            if form.is_valid():
                print('form valid')
                username = request.POST['username']
                password = request.POST['password']
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    messages.info(
                        request, f"You are now logged in as {username}")
                    return redirect('account')
                else:
                    messages.error(request, "Invalid username or password.")
            else:
                messages.error(request, "Invalid username or password.")
        form = AuthenticationForm()
        return render(request=request,
                      template_name="login.html",
                      context={"form": form})


@login_required(login_url='login')
def logout_view(request):
    if request.method == 'POST':

        logout(request)
        return redirect('login')


@login_required(login_url='login')
def func(request):

    if request.method == 'GET':

        last_five = UrlSaveModel.objects.filter().order_by('-id')[:5]

        latest = {'last_five': last_five}

        return render(request, 'main.html', latest)

    elif request.method == 'POST':

        form = UrlSaveForm(request.POST)
        try:
            if form.is_valid():

                print('form is valid')

                posted_url = request.POST['the_url']
                yt = YouTube(posted_url)

                description = yt.title
                print('description-extracted:', description)

                print('Posted_url', posted_url)
                obj = UrlSaveModel(desc=description, the_url=posted_url)
                obj.save()

                return HttpResponse('saved sucessfully!')

            else:
                print('error', form.errors)
                return render(request, 'save.html')
        except:
            return HttpResponse('Please enter a valid URL only!')


@login_required(login_url='login')
def search(request):

    if request.method == "POST":
        srch = request.POST['searched']
        try:
            if srch:
                match = UrlSaveModel.objects.filter(desc__icontains=srch)

                if match.exists():

                    vid = []

                    for matched in match:

                        url_data = urlparse(matched.the_url)
                        query = parse_qsl(url_data.query)
                        video_id = query["v"][0]

                        fvid = "http://i3.ytimg.com/vi/"+video_id+"/default.jpg"

                        vid.append(fvid)

                    zipped = zip(match, vid)

                    # print('matched 74', matched)
                    params = {'zipped': zipped}

                    # params = {'matches': match, 'vid': vid}
                    return render(request, 'search.html', params)

                else:
                    return HttpResponse('No match found!')
        except:
            return HttpResponse('Please enter a valid keyword!')


@login_required(login_url='login')
def show_thumbnails(request):

    all_thumbnails = []

    last_five = UrlSaveModel.objects.filter().order_by('-id')[:5]

    for last in last_five:
        print('last', last.the_url)

        try:

            yt = YouTube(last.the_url)

            thumbnails_url = yt.thumbnail_url

            print('thumbnails:', thumbnails_url)

            all_thumbnails.append(thumbnails_url)

        except:
            pass

    zipped = zip(last_five, all_thumbnails)

    params = {'zipped': zipped}

    return render(request, 'home.html', params)


@login_required(login_url='login')
# @allowed_users(allowed_roles=['User'])
def account(request):
    usersemail = request.user.email
    userinfo = UsersProfile.objects.get(email=usersemail)
    form = UserForm(instance=userinfo)
    if request.method == "POST":

        form = UserForm(request.POST, request.FILES, instance=userinfo)

        if form.is_valid():

            form.save()

    context = {'userinfo': userinfo, 'form': form}

    return render(request, 'user_account.html', context)


@login_required(login_url='login')
def new_search(request):

    if request.method == "POST":
        srch = request.POST['searched']
        try:
            if srch:
                match = UrlSaveModel.objects.filter(desc__icontains=srch)

                print('match from query:', match)

                desc = []

                if match.exists():

                    for matched in match:
                        print('matched', matched)

                        description = matched
                        print('description', description)
                        desc.append(description)

                    zipped = zip(match, desc)

                    params = {'zipped': zipped}
                    return render(request, 'nsearch.html', params)

                else:
                    return HttpResponse('No match found!')
        except:
            return HttpResponse('Please enter a valid keyword!')

    else:
        pass


# {% extends 'base.html' %} {% block content %}
# <form action="" method="POST">
#   {% csrf_token %}
#   <div class="container">
#     {{ form.as_p }}

#     <input type="submit" name="input" class="btn-btn primary" value="Submit" />
#   </div>
# </form>

# {% endblock %}
