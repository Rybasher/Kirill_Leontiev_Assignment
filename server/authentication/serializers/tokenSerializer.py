from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers, viewsets, status

from authentication.models import CustomUser
from user_settings.models import UserSettings


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length=128, min_length=6, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password',)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        UserSettings.objects.create(user=user)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        print('token', token)
        return token


class SignInSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=255, required=True, write_only=True)
    class Meta:
        model = CustomUser
        fields = ('username', 'password',)

