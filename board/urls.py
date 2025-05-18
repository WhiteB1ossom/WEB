from django.urls import path
from . import views

app_name = "board"
urlpatterns = [
    path('', views.board, name='board'),
    path('board/<str:detail>/' ,views.detail, name='detail'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/<int:pk>/like/', views.like_post, name='like_post'),
]
