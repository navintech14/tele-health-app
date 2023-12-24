# Generated by Django 4.1.7 on 2023-03-17 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0008_alter_bookslots_patientprofile"),
    ]

    operations = [
        migrations.CreateModel(
            name="PatientMedicalImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="profiles/images")),
                (
                    "patient_profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="profiles.patientprofile",
                    ),
                ),
            ],
        ),
    ]