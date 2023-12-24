from django.shortcuts import render, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import DoctorProfile, PatientProfile, BookSlots, PatientMedicalImage
from .serializers import DoctorProfileSerializer, PatientProfileSerializer, BookSlotsSerializer, PatientMedicalImageSerializer


def index(request):
    return HttpResponse("HOME PAGE")

@api_view(["POST", "GET"])
def doctor_profile_list(request):
    if request.method == "GET":
        queryset = DoctorProfile.objects.all()
        serializer = DoctorProfileSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = DoctorProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(["GET"])
def doctor_profile_details(request, id):
    if request.method == "GET":
        object = get_object_or_404(DoctorProfile, user_id=id)
        serializer = DoctorProfileSerializer(object)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# @api_view(["GET", "POST"])
# def doctor_profile_me(request):
#     if request.method == "GET":
#         object = get_object_or_404(DoctorProfile, user_id=request.user.id)
#         serializer = DoctorProfileSerializer(object)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     if request.method == "POST":
#         serializer = DoctorProfileSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)



    

@api_view(["GET", "POST"])
def patient_profile_list(request):
    if request.method == "GET":
        queryset = PatientProfile.objects.all()
        serializer = PatientProfileSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = PatientProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(["GET"])
def patient_profile_details(request, id):
    if request.method == "GET":
        object = get_object_or_404(PatientProfile, user_id=id)
        serializer = PatientProfileSerializer(object)
        return Response(serializer.data, status=status.HTTP_200_OK)
    



@api_view(["GET", "POST"])
def book_slots_list(request):
    if request.method == "GET":
        queryset = BookSlots.objects.all()
        serializer = BookSlotsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = BookSlotsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(["GET", "PATCH"])
def book_slot_details(request, id):
    if request.method == "GET":
        object = get_object_or_404(BookSlots, pk=id)
        serializer = BookSlotsSerializer(object)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "PATCH":
        object = BookSlots.objects.get(pk=id)
        serializer = BookSlotsSerializer(object, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


    
@api_view(["GET"])
def book_slots_my_list(request, id):
    if request.method == "GET":
        queryset = BookSlots.objects.filter(doctorProfile=id)
        serializer = BookSlotsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(["GET", "POST"])
def image_list(request):
    if request.method == "GET":
        queryset = PatientMedicalImage.objects.all()
        serializer = PatientMedicalImageSerializer(queryset, many = True)
        return Response(serializer.data,  status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = PatientMedicalImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(["GET"])
def my_image_list(request, id):
    if request.method == "GET":
        queryset = PatientMedicalImage.objects.filter(patientProfile=id)
        serializer = PatientMedicalImageSerializer(queryset, many = True)
        return Response(serializer.data,  status=status.HTTP_200_OK)