from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from account.forms import CustomUserCreationForm
from account.models import CustomUser

def main(request):
    return render(request, 'base.html')

def load_partial(request, page):
    try:
        return render(request, f'board/{page}.html')
    except:
        return HttpResponse("존재하지 않는 페이지", status=404)

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user) #로그인 처리 및 세션에 사용자 정보 저장
            return redirect('account:main')
        return render(request, 'account/login.html', {'form': form})

    return render(request, 'account/login.html', {'form': AuthenticationForm()})

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('account:login')  # 회원가입 후 로그인 페이지로 이동
        return render(request, 'account/signup.html', {'form': form})

    return render(request, 'account/signup.html', {'form': CustomUserCreationForm()})

# 4/10 회의 후 로그아웃 기능 구현 할거임. 아직 사용 X
def logout(request):
    request.session.flush()  # 모든 세션 삭제
    return redirect('/login/')


@login_required(login_url='/account/login/') # 세션에 로그인 정보가 있을 시 밑에 함수가 실행됨.
def menu(request):
    return render(request, 'account/menu.html')