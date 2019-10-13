from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout
from .models import Alumnus, Advisor, AssumedNeoPosition, Course, Neoson, NeoPosition, Person
from .serializers import AlumnusSerializer, AdvisorSerializer, AssumedNeoPositionSerializer, CourseSerializer,\
                         UserSerializer, GroupSerializer, PersonSerializer,\
                         NeosonSerializer, NeoPositionSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class AlumnusViewSet(viewsets.ModelViewSet):
    queryset = Alumnus.objects.all()
    serializer_class = AlumnusSerializer

class AdvisorViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class NeosonViewSet(viewsets.ModelViewSet):
    queryset = Neoson.objects.all()
    serializer_class = NeosonSerializer

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class NeoPositionViewSet(viewsets.ModelViewSet):
    queryset = NeoPosition.objects.all()
    serializer_class = NeoPositionSerializer

class AssumedNeoPositionViewSet(viewsets.ModelViewSet):
    queryset = AssumedNeoPosition.objects.all()
    serializer_class = AssumedNeoPositionSerializer

class LogoutView(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        logout(request)
        return Response(status=status.HTTP_200_OK)

def loginUser(request):
    # Django authenticate method, use CSRF
    print(request)
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
