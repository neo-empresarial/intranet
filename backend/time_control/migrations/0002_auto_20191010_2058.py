# Generated by Django 2.0.12 on 2019-10-10 23:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('time_control', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='dayofweek',
            table='day_of_week',
        ),
        migrations.AlterModelTable(
            name='request',
            table='request',
        ),
        migrations.AlterModelTable(
            name='requesttype',
            table='request_type',
        ),
        migrations.AlterModelTable(
            name='schedule',
            table='schedule',
        ),
        migrations.AlterModelTable(
            name='timeslot',
            table='time_slot',
        ),
    ]
