from django.shortcuts import render
from rest_framework import viewsets
from .models import DayOfWeek, Request, RequestType, Schedule, TimeSlot
from .serializers import DayOfWeekSerializer, RequestTypeSerializer, RequestSerializer,\
                         ScheduleSerializer, TimeSlotSerializer
from people_control.serializers import NeosonSerializer

# Create your views here.
class DayOfWeekViewSet(viewsets.ModelViewSet):
    queryset = DayOfWeek.objects.all()
    serializer_class = DayOfWeekSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class RequestTypeViewSet(viewsets.ModelViewSet):
    queryset = RequestType.objects.all()
    serializer_class = RequestTypeSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
