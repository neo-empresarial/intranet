from rest_framework import serializers
from people_control.models import Neoson
from .models import DayOfWeek, Request, RequestType, Schedule, TimeSlot
from people_control.serializers import NeosonSerializer

class DayOfWeekSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DayOfWeek
        fields = ['id', 'url', 'day']

class RequestTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RequestType
        fields = ['id', 'url', 'name', 'operation']

class TimeSlotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'url', 'time']

class ScheduleSerializer(serializers.HyperlinkedModelSerializer):
    day = DayOfWeekSerializer(read_only=True)
    day_id = serializers.PrimaryKeyRelatedField(source='day',
                                                queryset=DayOfWeek.objects.all(),
                                                write_only=True,)
    time = TimeSlotSerializer(read_only=True)
    time_id = serializers.PrimaryKeyRelatedField(source='time',
                                                 queryset=TimeSlot.objects.all(),
                                                 write_only=True,)
    neoson = NeosonSerializer(read_only=True)
    neoson_id = serializers.PrimaryKeyRelatedField(source='neoson',
                                                   queryset=Neoson.objects.all(),
                                                   write_only=True,)
    class Meta:
        model = Schedule
        fields = ['id', 'url', 'day', 'day_id', 'time', 'time_id', 'neoson',
                  'neoson_id', 'is_work', 'text', 'operation']

class RequestSerializer(serializers.HyperlinkedModelSerializer):
    day = DayOfWeekSerializer(read_only=True)
    day_id = serializers.PrimaryKeyRelatedField(source='day',
                                                queryset=DayOfWeek.objects.all(),
                                                write_only=True,)
    time = TimeSlotSerializer(read_only=True)
    time_id = serializers.PrimaryKeyRelatedField(source='time',
                                                 queryset=TimeSlot.objects.all(),
                                                 write_only=True,)
    requester = NeosonSerializer(read_only=True)
    requester_id = serializers.PrimaryKeyRelatedField(source='requester',
                                                      queryset=Neoson.objects.all(),
                                                      write_only=True,)
    approver = NeosonSerializer(read_only=True)
    approver_id = serializers.PrimaryKeyRelatedField(source='approver',
                                                     queryset=Neoson.objects.all(),
                                                     write_only=True,)
    request_type = RequestTypeSerializer(read_only=True)
    request_type_id = serializers.PrimaryKeyRelatedField(source='request_type',
                                                         queryset=RequestType.objects.all(),
                                                         write_only=True,)
    class Meta:
        model = Request
        fields = ['id', 'url', 'day', 'day_id', 'time', 'time_id',
                  'requester', 'requester_id', 'approver', 'approver_id',
                  'request_type', 'request_type_id', 'timestamp_request',
                  'date_requested', 'comment']
