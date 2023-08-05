from django.contrib import admin
from django.urls import path, include
from .views import ReactAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bookings/', include('bookings.urls')),
    path('', ReactAppView.as_view()), 
]