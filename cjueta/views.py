from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from cjueta.models import UserModel


# Create your views here.
def main(request):
    return render(request,"main.html")
def login(request):
    # print(UserModel.objects.all().values())
    if (request.method == 'GET'):
        return render(request, "login.html")


def login_check(request):
    if request.method == 'POST':
        userid = request.POST['user_id']
        userpwd = request.POST['user_password']
        user = UserModel.objects.filter(user_id=userid, user_password=userpwd).first()

        if user:
            request.session['user'] = user.user_id # 세션에 로그인 정보 저장
            return JsonResponse({'message': '로그인 성공!'})
        else:
            return JsonResponse({'message': '로그인 실패!'})

def join(request):
    if (request.method == 'GET'):
        return render(request, "join.html")

    if (request.method == 'POST'):
        user = UserModel()
        user.user_name = request.POST['user_name']
        user.user_id = request.POST['user_id']
        user.user_password = request.POST['user_password']
        user.category = request.POST['category']
        user.save()
        return redirect('/')

def checkUserId(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        exists = UserModel.objects.filter(user_id=user_id).exists()
        return JsonResponse({'exists': exists})

def board(request):
    if 'user' not in request.session:  # ✅ 세션에 로그인 정보가 없으면
        return redirect('/login/')
    return render(request, 'board.html')

# 4/10 회의 후 로그아웃 기능 구현 할거임. 아직 사용 X
def logout(request):
    request.session.flush()  # 모든 세션 삭제
    return redirect('/login/')