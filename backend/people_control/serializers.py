from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Alumnus, Advisor, Course, Neoson, Person


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'url', 'name']

class AlumnusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Alumnus
        fields = ['id', 'url', 'neoson', 'current_company', 'leave_date']

class AdvisorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Advisor
        fields = ['id', 'url', 'person', 'neoson', 'company']

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'url', 'course_name']

class NeosonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Neoson
        fields = ['id', 'url', 'person', 'user', 'acronym', 'join_date', 'course',
                  'matriculation_code', 'active']

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'url', 'name', 'surname', 'birthday', 'email', 'rg',
                  'cpf', 'linkedin', 'observation', 'gender']
