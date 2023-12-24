from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.index),
    path("doctor_profile_list/", views.doctor_profile_list),
    path("doctor_profile_details/<int:id>", views.doctor_profile_details),
    path("patient_profile_list/", views.patient_profile_list),
    path("patient_profile_details/<int:id>", views.patient_profile_details),
    path("book_slots_list/", views.book_slots_list),
    path("book_slot_details/<int:id>", views.book_slot_details),
    path("book_slots_list/<int:id>", views.book_slots_my_list),
    path("image_list/", views.image_list),
    path("my_image_list/<int:id>", views.my_image_list)
    
]