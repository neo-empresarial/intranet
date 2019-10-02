from django.db import models

class Person(models.Model):

    GENDER_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('X', 'Outro')
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
