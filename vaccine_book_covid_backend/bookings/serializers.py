from rest_framework import serializers
from .models import VaccinationCenter, User, VaccinationSlot

class VaccinationCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccinationCenter
        fields = '__all__'

class VaccinationSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccinationSlot
        fields = '__all__'