from rest_framework import serializers
from .models import Data
from django.contrib.auth import get_user_model

UserModel=get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields='__all__'

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password= serializers.CharField() 


class Data_serializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'