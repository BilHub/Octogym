from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Planning
from .serializers import PlanningSerialiser
from rest_framework.permissions import AllowAny, IsAuthenticated
from salle_sport.models import SalleSport

from rest_framework.views import APIView




# class PlanningAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = PlanningSerialiser(data=request.data)
#         if serializer.is_valid():
#             planning = serializer.save()
#             serializer = PlanningSerialiser(question)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlanningAPIView(generics.CreateAPIView):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerialiser

    # def create(self, request):
    #     salle_sport = get_object_or_404(SalleSport, name=request.data.get('salle_sport'))
    #     serializer = self.get_serializer(data= request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save(salle_sport=salle_sport)
    #     headers = self.get_success_headers(serializer.data)

    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PlanningListAPIView(generics.ListAPIView):
    queryset = Planning.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PlanningSerialiser


class PlanningDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Planning.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PlanningSerialiser

    def get_object(self):
        obj = get_object_or_404(Planning.objects.filter(id=self.kwargs["pk"]))
        print('theeeeeeee ', obj , obj.id)
        return obj
    
    def put(self, request, *args, **kwargs):
        #  actuel = Planning.objects.get(pk = instance.id) 
        # plan = Planning.objects.update(salle_sport=request['salle_sport']['name'], name=request['name'])
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        print("PATCHHHHHHHHH")
        return self.update(request, *args, **kwargs)


class PlanningDestroyAPIView(generics.DestroyAPIView):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerialiser


    