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
    def fetch_user_info(self, user):
        return {"username" : user.username, "is_expert": user.is_expert}

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

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.age = validated_data.get('age', instance.age)
        instance.name = validated_data.get('name', instance.name)
        print(validated_data)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance
