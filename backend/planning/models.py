from django.db import models
# from ..client.models import Client, Coach
# from ..creneau.models import Creneau
# from ..salle_activite.models import Salle, Activity
from salle_sport.models import SalleSport


class Planning(models.Model):
    name            = models.CharField(max_length=200)
    salle_sport     = models.ForeignKey(SalleSport, verbose_name="Salle de sport", related_name='plannings', on_delete=models.CASCADE, null=True, blank=True)
    
    # activite        = models.ManyToManyField("Activity", verbose_name="Activité")
    # salle_activite  = models.ManyToManyField("Salle", verbose_name="salle d'activité")
    # prof            = models.ManyToManyField("Coach", verbose_name="Coach")
    # creneau         = models.ManyToManyField("Creneau", verbose_name="créneau")
    # client          = models.ManyToManyField("Client")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Planning_detail", kwargs={"pk": self.pk})
