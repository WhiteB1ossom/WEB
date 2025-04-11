from django.urls import path
from . import views
urlpatterns = [
    path('', views.main), #메인 페이지(시작 페이지) 로드
    path('login/', views.login), # 로그인 페이지 로드
    path('login/new', views.join), # 회원가입 로드
    path('check_user_id/', views.checkUserId), #회원가입 시 아이디 중복체크 경로
    path('login/check_login/', views.login_check, name='login_check'),
    path('board/', views.board, name='board'),


]