# Generated by Django 4.1.7 on 2023-03-13 12:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0005_bookslots_cost"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="bookslots",
            name="cost",
        ),
    ]
