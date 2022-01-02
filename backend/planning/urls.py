from django.urls import path, include
from .views import PlanningAPIView, PlanningListAPIView, PlanningDetailAPIView, PlanningDestroyAPIView


app_name = 'planning'


urlpatterns = [
    path('', PlanningListAPIView.as_view(),  name="planning"),
    path('<int:pk>/', PlanningDetailAPIView.as_view(), name="planning-delete"),
    path('create', PlanningAPIView.as_view(),  name="planning-create"),
    path('delete/<int:pk>/', PlanningDestroyAPIView.as_view(), name="planning-delete"),
]


