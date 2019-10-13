from django.db import models
from people_control.models import Neoson

class TimeSlot(models.Model):
    time = models.TimeField()

    def __str__(self):
        return str(self.time)

    class Meta:
        db_table = 'time_slot'

class DayOfWeek(models.Model):
    day = models.CharField(max_length=50)

    def __str__(self):
        return str(self.day)

    class Meta:
        db_table = 'day_of_week'

class Schedule(models.Model):

    OPERATIONS = [
        ('+10', 'NEO+'),
        ('-10', 'NEO-'),
        ('+0', 'NEO'),
        ('', '')
    ]
    day = models.ForeignKey('DayOfWeek', on_delete=models.CASCADE)
    time = models.ForeignKey('TimeSlot', on_delete=models.CASCADE)
    neoson = models.ForeignKey(Neoson, on_delete=models.CASCADE)
    is_work = models.BooleanField()
    text = models.TextField(default='', blank=True)
    operation = models.CharField(max_length=100, choices=OPERATIONS)

    def __str__(self):
        return str(self.day.day)

    class Meta:
        db_table = 'schedule'

class RequestType(models.Model):
    name = models.CharField(max_length=100)
    operation = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = 'request_type'

class Request(models.Model):
    day = models.ForeignKey('DayOfWeek', on_delete=models.CASCADE)
    time = models.ForeignKey('TimeSlot', on_delete=models.CASCADE)
    requester = models.ForeignKey(Neoson, related_name='requests_creator', on_delete=models.CASCADE)
    approver = models.ForeignKey(Neoson, related_name='requests_approver', on_delete=models.CASCADE)
    request_type = models.ForeignKey('RequestType', on_delete=models.CASCADE)
    timestamp_request = models.DateTimeField()
    date_requested = models.DateField()
    comment = models.TextField(default='', blank=True)

    class Meta:
        db_table = 'request'
