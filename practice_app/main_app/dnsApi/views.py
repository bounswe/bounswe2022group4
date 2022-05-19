from django.shortcuts import render
import requests
from .forms import DomainForm

def index(request):

    if(request.method == "POST"):
        
        url = 'https://api.geekflare.com/dnsrecord'
        domain = request.POST["domain"]
        r = requests.post(url, json={"url": domain}, headers={"x-api-key": "5422cd59-fc10-43bc-a192-d800340fcbeb"}).json()
        
        country = r["data"][0]["country"]
        city = r["data"][0]["city"] 
        a = r["data"][0]["data"]["A"]
        mx = r["data"][0]["data"]["MX"]
        ns = r["data"][0]["data"]["NS"]

        dns = {
            'domain': domain,
            'country': country,
            'city': city,
            'a' : a,
            'mx': mx,
            'ns': ns
        }
    else:
        
        dns = {
        }

    form = DomainForm()
    context = {'dns' : dns, 'form': form}
    return render(request, 'dnsApi/index.html', context)
