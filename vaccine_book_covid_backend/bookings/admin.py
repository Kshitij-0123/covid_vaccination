from django.contrib import admin
from .models import VaccinationCenter, User, VaccinationSlot

admin.site.register(VaccinationCenter)
admin.site.register(User)
admin.site.register(VaccinationSlot)