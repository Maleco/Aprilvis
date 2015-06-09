# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect

urlpatterns = patterns('',
    # Root URL
    url(r'^/?$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^/results', TemplateView.as_view(template_name='results.html'), name='results'),
    url(r'^circles.html$', TemplateView.as_view(template_name='layout/circles.html'), name='circles'),
    url(r'^heatmap.html$', TemplateView.as_view(template_name='layout/heatmap.html'), name='heatmap'),
    url(r'^favicon.ico/$', lambda x: HttpResponseRedirect('static/img/favicon.ico')),
)
