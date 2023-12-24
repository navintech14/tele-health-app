from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    isDoctor = models.BooleanField(null=True)
    email = models.EmailField(null=False, blank=False)

class PatientProfile(models.Model):
    genderChoices = [
        ("Male", "Male"),
        ("Female", "Female"),
    ]
    bloodGroupChoices = [
        ("A Positive", "A Positive"),
        ("A Negative", "A Negative"),
        ("B Positive", "B Positive"),
        ("B Negative", "B Negative"),
        ("O Positive", "O Positive"),
        ("O Negative", "O Negative"),
        ("AB Positive", "AB Positive"),
        ("AB Negative", "AB Negative"),
    ]
    birthdate = models.DateField()
    gender = models.CharField(choices=genderChoices, max_length=255)
    blood_group = models.CharField(choices=bloodGroupChoices, max_length=255, null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=255)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patientProfile")

    def __str__(self) -> str:
        return self.name
    
class PatientMedicalImage(models.Model):
    patientProfile = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="profiles/images")
    key = models.CharField(max_length=1024)



class DoctorProfile(models.Model):
    cityChoices = [
        ("Chennai", "Chennai"),
        ("Delhi", "Delhi"),
        ("Mumbai", "Mumbai"),
        ("Kolkata", "Kolkata"),
        ("Hydrabad", "Hydrabad"),
        ("Banglore", "Banglore")
    ]
    specializationChoices = [
        ("General Health", "General Health"),
        ("Pediatrician", "Pediatrician"),
        ("Dentist", "Dentist"),
        ("Orthopedist", "Orthopedist"),
        ("Dermatologist", "Dermatologist")
    ]
    experience = models.IntegerField()
    cost = models.IntegerField()
    about = models.TextField()
    specialization = models.CharField(choices=specializationChoices, max_length=255)
    address = models.CharField(max_length=511)
    city = models.CharField(choices=cityChoices, max_length=255)
    degrees = models.CharField(max_length=511)
    name = models.CharField(max_length=255)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="doctorProfile")

    def __str__(self) -> str:
        return self.name


class BookSlots(models.Model):
    doctorProfile = models.ForeignKey(DoctorProfile, on_delete=models.PROTECT, related_name="doctor_profile")
    patientProfile = models.ForeignKey(PatientProfile, on_delete=models.PROTECT, null=True, blank=True, related_name="patient_profile")
    booked_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    booking_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self) -> str:
        return f"{self.doctorProfile} {self.patientProfile}"