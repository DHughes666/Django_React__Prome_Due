from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.user.models import User

class UserSerializer(AbstractSerializer):
       

    class Meta:
        model = User
        fields = ['id', 'created', 'updated', 'first_name', 'last_name',
                  'email', 'bio', 'avatar', 'is_active']
        read_only_field = ['is_active']

    

    