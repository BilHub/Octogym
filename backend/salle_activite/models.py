from django.db import models

# Create your models here.
class Salle(models.Model):
    name = models.CharField(max_length=50, verbose_name="nom de la salle d'activité")
    # coach = models.ManyToManyField("app.Coach")
    def __str__(self):
        return self.name

class Activity(models.Model):
    name    = models.CharField( max_length=150, verbose_name="nom d'activité")
    salle   = models.ForeignKey(Salle, on_delete=models.CASCADE, related_name='actvities')
    color   = models.CharField( max_length=50, default='#233774', blank=True, null=True) 
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("salle_activity:activity_detail", kwargs={"pk": self.pk})









 