from django.urls import path, include
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
import people_control.views
from rest_framework.authtoken.views import obtain_auth_token
from rest_auth.registration.views import VerifyEmailView, RegisterView
from allauth.account.views import confirm_email

router = routers.DefaultRouter()
router.register(r'users', people_control.views.UserViewSet)
router.register(r'groups', people_control.views.GroupViewSet)
router.register(r'person', people_control.views.PersonViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/login/', obtain_auth_token, name='api_auth'),
    path('api-auth/registration/', include('rest_auth.registration.urls')),
    path('api-auth/logout/', people_control.views.LogoutView.as_view(), name='logout'),
    path('login/', people_control.views.loginUser, name='login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
