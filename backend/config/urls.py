from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
import people_control.views
from rest_framework.authtoken.views import obtain_auth_token 

router = routers.DefaultRouter()
router.register(r'users', people_control.views.UserViewSet)
router.register(r'groups', people_control.views.GroupViewSet)
router.register(r'person', people_control.views.PersonViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', obtain_auth_token, name='api_auth'),
    path('admin/', admin.site.urls),
    path('register/', include('rest_auth.registration.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
