from django.contrib.auth import logout
from django.shortcuts import render
from .models import UrlSaveModel
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
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from .forms import NewUserForm
from django.contrib.auth import logout
from django.shortcuts import HttpResponseRedirect
from pytube import YouTube

# Create your views here.


def login_request(request):
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
                messages.info(request, f"You are now logged in as {username}")
                return redirect('home/')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request,
                  template_name="login.html",
                  context={"form": form})


def Registration(request):

    form = NewUserForm()

    context = {'form': form}

    return render(request, 'new_user.html', context=context)


def logout_view(request):
    logout(request)
    return redirect('login')


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
                video_ = etree.HTML(urlopen(posted_url).read())
                video_title = video_.xpath("//span[@id='eow-title']/@title")
                description = ''.join(video_title)
                print('description-extracted:', description)

                print('Posted_url', posted_url)
                obj = UrlSaveModel(desc=description, the_url=posted_url)
                obj.save()

                return HttpResponse('saved sucessfully!')

            else:
                print('error', form.errors)
                return render(request, 'core.html')
        except:
            return HttpResponse('Please enter a valid URL only!')


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


def show_thumnails(request):

    all_thumbnails = []

    last_five = UrlSaveModel.objects.filter().order_by('-id')[:5]
    import os
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print('BASE_DIR', BASE_DIR)

    # latest = {'last_five': last_five}

    for last in last_five:
        print('last', last.the_url)

        yt = YouTube(last.the_url)

        thumbnails_url = yt.thumbnail_url

        # url_data = urlparse(last.the_url)
        # query = parse_qs(url_data.query)
        # video_id = query["v"][0]
        # print('video_id:', video_id)

        # thumbnails_url = "http://i3.ytimg.com/vi/"+video_id+"/hqdefault.jpg"

        print('thumbnails:', thumbnails_url)

        all_thumbnails.append(thumbnails_url)

    zipped = zip(last_five, all_thumbnails)

# print('matched 74', matched)
    params = {'zipped': zipped}

    # params = {'matches': match, 'vid': vid}

    return render(request, 'home.html', params)


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


# def url_search(request):

#     if request.method == "GET":

#         query = request.GET['query_url']
