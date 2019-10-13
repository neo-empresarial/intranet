from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Alumnus, Advisor, AssumedNeoPosition, Course, Neoson, NeoPosition, Person


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'url', 'name']

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'url', 'course_name']

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'url', 'name', 'surname', 'birthday', 'email', 'rg',
                  'cpf', 'linkedin', 'observation', 'gender']

class NeosonSerializer(serializers.HyperlinkedModelSerializer):
    person = PersonSerializer(read_only=True)
    person_id = serializers.PrimaryKeyRelatedField(source='person',
                                                   queryset=Person.objects.all(),
                                                   write_only=True,)
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source='user',
                                                 queryset=User.objects.all(),
                                                 allow_null=True,
                                                 write_only=True,)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(source='course',
                                                   queryset=Course.objects.all(),
                                                   write_only=True,)
    class Meta:
        model = Neoson
        fields = ['id', 'url', 'person', 'person_id', 'user', 'user_id',
                  'acronym', 'join_date', 'course', 'course_id', 'matriculation_code', 'active']

class AlumnusSerializer(serializers.HyperlinkedModelSerializer):
    neoson = NeosonSerializer(read_only=True)
    neoson_id = serializers.PrimaryKeyRelatedField(source='neoson',
                                                   queryset=Neoson.objects.all(),
                                                   write_only=True,)
    class Meta:
        model = Alumnus
        fields = ['id', 'url', 'neoson', 'neoson_id', 'current_company', 'leave_date']

class AdvisorSerializer(serializers.HyperlinkedModelSerializer):
    person = PersonSerializer(read_only=True)
    person_id = serializers.PrimaryKeyRelatedField(source='person',
                                                   queryset=Person.objects.all(),
                                                   write_only=True,)
    alumnus = AlumnusSerializer(read_only=True)
    alumnus_id = serializers.PrimaryKeyRelatedField(source='alumnus',
                                                    queryset=Alumnus.objects.all(),
                                                    allow_null=True,
                                                    write_only=True,)
    class Meta:
        model = Advisor
        fields = ['id', 'url', 'person', 'person_id', 'alumnus', 'alumnus_id', 'company']

class NeoPositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NeoPosition
        fields = ['id', 'url', 'name', 'description']

class AssumedNeoPositionSerializer(serializers.HyperlinkedModelSerializer):
    neoson = NeosonSerializer(read_only=True)
    neoson_id = serializers.PrimaryKeyRelatedField(source='neoson',
                                                   queryset=Neoson.objects.all(),
                                                   write_only=True,)
    neo_position = NeoPositionSerializer(read_only=True)
    neo_position_id = serializers.PrimaryKeyRelatedField(source='neo_position',
                                                         queryset=NeoPosition.objects.all(),
                                                         write_only=True,)
    class Meta:
        model = AssumedNeoPosition
        fields = ['id', 'url', 'neoson', 'neoson_id', 'neo_position',
                  'neo_position_id', 'assumed_date']
