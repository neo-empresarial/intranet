from django.urls import path, include, re_path
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from rest_framework import routers
import people_control.views
import time_control.views
from rest_framework.authtoken.views import obtain_auth_token
from rest_auth.registration.views import VerifyEmailView, RegisterView
from rest_auth.views import UserDetailsView 
from allauth.account.views import confirm_email
from .views import index, redirect_view

#PasswordChangeView, PasswordResetView, PasswordResetConfirmView, LoginView, LogoutView, 

router = routers.DefaultRouter()
router.register(r'users', people_control.views.UserViewSet)
router.register(r'groups', people_control.views.GroupViewSet)
router.register(r'alumnus', people_control.views.AlumnusViewSet)
router.register(r'advisor', people_control.views.AdvisorViewSet)
router.register(r'course', people_control.views.CourseViewSet)
router.register(r'neoson', people_control.views.NeosonViewSet)
router.register(r'person', people_control.views.PersonViewSet)
router.register(r'neo_position', people_control.views.NeoPositionViewSet)
router.register(r'assumed_position', people_control.views.AssumedNeoPositionViewSet)
router.register(r'day_of_the_week', time_control.views.DayOfWeekViewSet)
router.register(r'request', time_control.views.RequestViewSet)
router.register(r'request_type', time_control.views.RequestTypeViewSet)
router.register(r'schedule', time_control.views.ScheduleViewSet)
router.register(r'timeslot', time_control.views.TimeSlotViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/login/', obtain_auth_token, name='api_auth'),
    path('api-auth/registration/', include('rest_auth.registration.urls')),
    path('api-auth/logout/', people_control.views.LogoutView.as_view(), name='logout'),
    path('api-auth/users/', UserDetailsView.as_view(), name='rest_user_details'),
    path('login/', people_control.views.loginUser, name='login'),
    re_path(r'^(?:.*)/?$', index, name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
