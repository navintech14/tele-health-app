# Generated by Django 4.1.7 on 2023-03-12 23:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0003_alter_patientprofile_gender"),
    ]

    operations = [
        migrations.RenameField(
            model_name="patientprofile",
            old_name="birth_date",
            new_name="birthdate",
        ),
    ]
