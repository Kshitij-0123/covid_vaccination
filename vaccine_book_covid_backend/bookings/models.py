from django.db import models

class VaccinationCenter(models.Model):
    name = models.CharField(max_length=100, null=True)
    working_hours = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=200, null=True)
    state = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address_user = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name

class VaccinationSlot(models.Model):
    center = models.ForeignKey(VaccinationCenter, on_delete=models.CASCADE)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    available_slots = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.center.name} - {self.date}"
