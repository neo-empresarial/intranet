from django.db import models
from django.contrib.auth.models import User

class Person(models.Model):

    GENDER_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Feminino', 'Feminino'),
        ('Outro', 'Outro')
    ]

    name = models.CharField(max_length=50, default='')
    surname = models.CharField(max_length=100, default='')
    birthday = models.DateField()
    email = models.CharField(max_length=100, default='', blank=True)
    rg = models.CharField(max_length=100, default='', blank=True)
    cpf = models.CharField(max_length=100, default='', blank=True)
    linkedin = models.CharField(max_length=240, blank=True)
    observation = models.CharField(max_length=240, blank=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1, blank=True)

    def __str__(self):
        return self.name

class Neoson(models.Model):
    person = models.OneToOneField('Person', on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    acronym = models.CharField(
                max_length=50,
                default='',
                unique=True,
                error_messages={
                    'unique': ("A Neoson with that acronym already exists."),
                },)
    join_date = models.DateField()
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    matriculation_code = models.IntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.acronym

class Course(models.Model):
    course_name = models.CharField(max_length=60)

    def __str__(self):
        return self.course_name

class Alumnus(models.Model):
    neoson = models.OneToOneField('Neoson', on_delete=models.CASCADE)
    current_company = models.CharField(max_length=100)
    leave_date = models.DateField()

    def __str__(self):
        return self.neoson.person.name


class Advisor(models.Model):
    person = models.OneToOneField('Person', on_delete=models.CASCADE)
    neoson = models.OneToOneField('Neoson', on_delete=models.SET_NULL, null=True, blank=True)
    company = models.CharField(max_length=100)

    def __str__(self):
        return self.person.name
