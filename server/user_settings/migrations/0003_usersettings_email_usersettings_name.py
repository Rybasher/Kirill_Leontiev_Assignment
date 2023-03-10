# Generated by Django 4.1.5 on 2023-02-14 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_settings', '0002_alter_usersettings_age'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersettings',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
