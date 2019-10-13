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
    gender = models.CharField(choices=GENDER_CHOICES, max_length=50, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'person'

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

    class Meta:
        db_table = 'neoson'

class Course(models.Model):
    course_name = models.CharField(max_length=60)

    def __str__(self):
        return self.course_name

    class Meta:
        db_table = 'course'

class Alumnus(models.Model):
    neoson = models.OneToOneField('Neoson', on_delete=models.CASCADE)
    current_company = models.CharField(max_length=100)
    leave_date = models.DateField()

    def __str__(self):
        return self.neoson.person.name

    class Meta:
        db_table = 'alumnus'

class Advisor(models.Model):
    person = models.OneToOneField('Person', on_delete=models.CASCADE)
    alumnus = models.OneToOneField('Alumnus', on_delete=models.SET_NULL, null=True, blank=True)
    company = models.CharField(max_length=100)

    def __str__(self):
        return self.person.name

    class Meta:
        db_table = 'advisor'

class NeoPosition(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'neo_position'

class AssumedNeoPosition(models.Model):
    neoson = models.ForeignKey('Neoson', on_delete=models.CASCADE)
    neo_position = models.ForeignKey('NeoPosition', on_delete=models.CASCADE)
    assumed_date = models.DateField()

    def __str__(self):
        return (self.neoson.name + "" + self.neo_position.name)

    class Meta:
        db_table = 'assumed_neo_position'
