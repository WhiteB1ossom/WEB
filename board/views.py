from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from board.form import BoardForm, CommentForm
from .models import Board

# Create your views here.
def board(request):
    return render(request, 'board/board.html')

def detail(request, detail):
    if request.method == 'POST':
        form = BoardForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.category = detail
            post.save()
            return redirect('board:detail', detail=detail)
    else:
        form = BoardForm()  #빈 폼 생성

    posts = Board.objects.filter(category=detail).order_by('-created_date')
    return render(request, 'board/detail.html',{
        'detail': detail,
        'form': form,
        'posts': posts
    })

def like_post(request, pk):
    post = get_object_or_404(Board, pk=pk)
    user = request.user

    if user in post.likes.all():
        post.likes.remove(user)
    else:
        post.likes.add(user)

    return redirect('board:post_detail', pk=pk)

def post_detail(request, pk):
    post = get_object_or_404(Board, pk=pk)
    comments = post.comments.all().order_by('created_date')
    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect('board:post_detail', pk=pk)
    else:
        comment_form = CommentForm() # 빈 폼 생성

    return render(request, 'board/post_detail.html', {
        'post': post,
        'comments': comments,
        'comment_form': comment_form
    })