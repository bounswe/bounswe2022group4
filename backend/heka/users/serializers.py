from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'is_expert',
        ]
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class ProfilePageSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'is_expert',
            'date_joined',
            'is_expert',
            'is_admin',
            'age',
            'name',
            'last_login',
            'profile_image',
        ]

