# Generated by Django 2.0.12 on 2019-10-07 23:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('people_control', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Advisor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Allumnus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_company', models.CharField(max_length=100)),
                ('leave_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_name', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Neoson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acronym', models.CharField(default='', error_messages={'unique': 'A Neoson with that acronym already exists.'}, max_length=50, unique=True)),
                ('join_date', models.DateField()),
                ('matriculation_code', models.IntegerField()),
                ('active', models.BooleanField(default=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='people_control.Course')),
                ('person', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='people_control.Person')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='allumnus',
            name='neoson',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='people_control.Neoson'),
        ),
        migrations.AddField(
            model_name='advisor',
            name='neoson',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='people_control.Neoson'),
        ),
        migrations.AddField(
            model_name='advisor',
            name='person',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='people_control.Person'),
        ),
    ]
