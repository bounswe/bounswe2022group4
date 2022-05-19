from django.db import models
from django.urls import reverse
# Create your models here.
class City (models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('city-form')