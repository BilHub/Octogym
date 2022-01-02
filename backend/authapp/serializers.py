from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import CustomUser


class SignUpSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fileds = '__al__'
class LogoutUserSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    default_error_messages = {
        'bad_token': ('Token is expired or invalid ')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')

