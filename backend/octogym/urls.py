from django.contrib import admin
from django.urls import path, include,  re_path
from rest_framework import routers
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from schema_graph.views import Schema

urlpatterns = [
    # path('rest-api/auth/', include('authentification.urls')),
    path('', include('authapp.urls')),
    path('rest-api/auth/', include('djoser.urls')),
    path('rest-api/auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('rest-api/', include('client.urls')),
    # path('', include('rest_framework.urls')),
    path('rest-api/creneau/', include('creneau.urls')),
    path('rest-api/materiel/', include('materiel.urls')),
    path('rest-api/presence/', include('presence.urls')),
    path('rest-api/salle-sport/', include('salle_sport.urls')),
    path('rest-api/transactions/', include('transaction.urls')),
    path('rest-api/', include('abonnement.urls')),
    path('rest-api/planning/', include('planning.urls')),
    path('rest-api/assurance/', include('assurance.urls')),
    path('rest-api/salle-activite/', include('salle_activite.urls')),
    path("schema/", Schema.as_view()),
    # path ('',TemplateView.as_view(template_name="index.html"), name='index'),
    # re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html"), name='index'),
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)),] 

