# Generated by Django 2.0.12 on 2019-10-08 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people_control', '0002_auto_20191007_2015'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Allumnus',
            new_name='Alumnus',
        ),
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(blank=True, choices=[('Masculino', 'Masculino'), ('Feminino', 'Feminino'), ('Outro', 'Outro')], max_length=1),
        ),
    ]