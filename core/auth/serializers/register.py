from rest_framework import serializers

from core.user.serializers import UserSerializer
from django.contrib.auth import get_user_model



class RegisterSerializer(UserSerializer):
    """
    Registration serializer for requests and user creation
    """
    # First we make sure the password is at least 8 characters long
    # and no longer than 128, and can't be read by the user
    
    class Meta:
        model = get_user_model()
        # List of all the fields that can be included in a request
        # or response
        fields = ['id', 'bio', 'avatar', 'email', 'username',
                  'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True, 
                                     'min_length': 8,
                                     'max_length': 128,
                                     'required': True}}
        
        def create(self, validated_data):
            """
            Create and return a user with encrypted password
            """
            return get_user_model().objects.create_user(**validated_data)
        
        def update(self, instance, validated_data):
            """Update and return user"""
            password = validated_data.pop('password', None)
            user = super().update(instance, validated_data)

            if password:
                user.set_password(password)
                user.save()
            return user
        
        