from django.urls import path
from . import views

app_name = "map"

urlpatterns = [
    path('', views.map, name='map'),
]