from rest_framework import serializers, views

from core.user.serializers import UserSerializer
from django.contrib.auth import get_user_model


class RegisterSerializer(UserSerializer):
    """
    Registration serializer for requests and user creation
    """
    # First we make sure the password is at least 8 characters long
    # and no longer than 128, and can't be read by the user
    password = serializers.CharField(
        max_length=128, write_only=True, required=False)
    
    class Meta:
        model = get_user_model()
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'bio', 'avatar', 'email', 'username', 'first_name',
                  'last_name', 'password']
        
    #ALWAYS ensure that the `create` method is not in the `Meta` class
    #Also, use the `create_user` method from the model to create a new user
    def create(self, validate_data):
        # Use the `create_user` method we wrote earlier for the
        # UserManager to create a new user
        return get_user_model().objects.create_user(**validate_data)
    
    