from django.contrib.auth.models import AbstractUser
from django.db import models
from model_utils import Choices

ROLE = [
    ('admin', 'ADMIN'),
    ('staff', 'STAFF')
]

class CustomUser(AbstractUser):
    role = models.CharField(max_length=20, choices=ROLE)
    username = models.CharField (default="", max_length=50, unique = True)
    email = models.EmailField(max_length=50, unique = True)
    # is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username





