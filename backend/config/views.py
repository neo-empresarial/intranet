from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.shortcuts import redirect

def redirect_view(request):
    response = redirect('/dashboard/')
    return response

# Serve Single Page Application
index = TemplateView.as_view(template_name='index.html')
