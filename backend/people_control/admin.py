from django.contrib import admin
from .models import Alumnus, Advisor, Course, Neoson, Person

admin.site.register([Alumnus, Advisor, Course, Neoson, Person])
