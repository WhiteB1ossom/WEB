from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'nickname', 'category', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('추가 정보', {'fields': ('nickname', 'category')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('추가 정보', {'fields': ('nickname', 'category')}),
    )