# Generated by Django 4.1.5 on 2023-02-09 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('countries', '0002_country_iso2_country_iso3'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='city',
            name='lng',
            field=models.FloatField(blank=True, null=True),
        ),
    ]