# Generated by Django 2.0.12 on 2019-10-10 23:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('people_control', '0006_auto_20191009_2245'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='advisor',
            table='advisor',
        ),
        migrations.AlterModelTable(
            name='alumnus',
            table='alumnus',
        ),
        migrations.AlterModelTable(
            name='assumedneoposition',
            table='assumed_neo_position',
        ),
        migrations.AlterModelTable(
            name='course',
            table='course',
        ),
        migrations.AlterModelTable(
            name='neoposition',
            table='neo_position',
        ),
        migrations.AlterModelTable(
            name='neoson',
            table='neoson',
        ),
        migrations.AlterModelTable(
            name='person',
            table='person',
        ),
    ]
