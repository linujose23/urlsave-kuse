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


# Create your views here.


def func(request):

    if request.method == 'GET':

        return render(request, 'core.html')

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
                        query = parse_qs(url_data.query)
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
