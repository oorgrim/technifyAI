from django.contrib import admin
from api.models import User, Profile, Agency

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' ,'verified']


class AgencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'created_at']
    search_fields = ['name', 'code']
    readonly_fields = ['code']

admin.site.register(Agency, AgencyAdmin)



admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)