from django.urls import path
from . import views
app_name = "account"
urlpatterns = [
    path('', views.login_view, name='login'),
    path('main', views.main, name='main'),
    path('load/<str:page>/', views.load_partial, name='load_partial'),
    path('signup/', views.signup_view, name='signup'),
]