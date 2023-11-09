from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class UserAdmin(UserAdmin):
    list_display = ('email', 'username', 'created', 'updated',
                    'is_admin', 'is_staff')
    search_fields = ('email', 'username')
    readonly_fields = ('id', 'created', 'updated')
    
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(User, UserAdmin)