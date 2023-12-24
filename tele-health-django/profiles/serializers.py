from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as DefaultUserCreateSerializer, UserSerializer as DefautUserSerializer
from .models import DoctorProfile, PatientProfile, BookSlots, PatientMedicalImage

class UserCreateSerializer(DefaultUserCreateSerializer):
    class Meta(DefaultUserCreateSerializer.Meta):
        fields = ["id", "username", "password", "email", "isDoctor"]

class UserSerializer(DefautUserSerializer):
    class Meta(DefautUserSerializer.Meta):
        fields = ["id", "username", "email", "isDoctor"]

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ["id", "user", "name", "experience", "cost", "about", "specialization", "address", "city", "degrees"]

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ["id", "user", "name", "birthdate", "gender", "blood_group", "height", "weight"]

class BookSlotsSerializer(serializers.ModelSerializer):
    patientProfile = PatientProfileSerializer()
    class Meta:
        model = BookSlots
        fields = ["id", "doctorProfile", "patientProfile", "booked_at", "booking_date", "start_time", "end_time"]

class PatientMedicalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMedicalImage
        fields = ["id", "image", "key", "patientProfile"]
