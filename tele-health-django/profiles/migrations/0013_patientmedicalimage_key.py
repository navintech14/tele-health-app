# Generated by Django 4.1.7 on 2023-03-25 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0012_patientmedicalimage_patientprofile"),
    ]

    operations = [
        migrations.AddField(
            model_name="patientmedicalimage",
            name="key",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]