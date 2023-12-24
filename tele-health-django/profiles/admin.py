from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from.models import User, DoctorProfile, PatientProfile, BookSlots, PatientMedicalImage


class UserAdmin(DefaultUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", "first_name","last_name", "email", 
                           "is_active", "is_staff", "is_superuser", "groups", "user_permissions", "isDoctor"),
            },
        ),
    )

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(BookSlots)
class BookSlotsAdmin(admin.ModelAdmin):
    pass


@admin.register(PatientMedicalImage)
class PatientMedicalImageAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)
