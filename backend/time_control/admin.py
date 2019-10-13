from django.contrib import admin
from .models import DayOfWeek, Request, RequestType, Schedule, TimeSlot

admin.site.register([DayOfWeek, Request, RequestType, Schedule, TimeSlot])
