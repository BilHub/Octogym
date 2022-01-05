from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import SignUpSerializer, LogoutUserSerializer


class SignUp(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = SignUpSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class UsersList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = SignUpSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutUser(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response ("utilisateur deconnecté", status = status.HTTP_204_NO_CONTENT)
        return Response(status = status.HTTP_400_BAD_REQUEST)




