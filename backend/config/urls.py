from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import (
    obtain_jwt_token, verify_jwt_token
    )

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('admin/', admin.site.urls),
    path('register/', include('rest_auth.registration.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
