from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.post.models import Post
from core.user.models import User


class PostSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field='public_id')
    
    def validate_author(self, value):
        if self.context['request'].user != value:
            raise ValidationError(
                "You cannot create a post for another user.")
        return value
    
    class Meta:
        model = Post
        # List of all the fields that can be included in a request
        # or response
        fields = ['id', 'author', 'title', 'body', 'edited',
                  'created', 'updated']
        read_only_fields = ['edited']
        