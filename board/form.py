# board/forms.py
from django import forms
from .models import Board
from .models import Comment

class BoardForm(forms.ModelForm):
    class Meta: #참고)Meta 클래스는 폼과 관련된 정보를 설정하는 곳으로, 보통 폼이 어떤 모델을 기반으로 할지, 어떤 필드를 폼에 포함할지 등을 지정
        model = Board
        fields = ['title', 'content']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 3, 'placeholder': '댓글을 입력하세요...'}),
        }
        labels = {
            'content': '',  # 라벨 없이 간단한 UI
        }