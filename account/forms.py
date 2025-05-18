from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    CATEGORY_CHOICES = (
        (0, '학부생'),
        (1, '중고등학생'),
    )
    category = forms.ChoiceField(choices=CATEGORY_CHOICES, widget=forms.RadioSelect)
    nickname = forms.CharField(max_length=30)

    class Meta:
        model = CustomUser
        fields = ('username', 'password1', 'password2', 'nickname', 'category')  # username은 AbstractUser 기본 필드

    def save(self, commit=True):
        user = super().save(commit=False)
        user.category = self.cleaned_data['category']
        user.nickname = self.cleaned_data['nickname']
        if commit:
            user.save()
        return user