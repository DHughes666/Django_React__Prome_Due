import uuid
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin, User
)
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.http import Http404

from core.abstract.models import AbstractModel, AbstractManager

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "user_{0}/{1}".format(instance.public_id, filename)

# Create your models here.
class UserManager(BaseUserManager, AbstractManager):
    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id = public_id)
            return instance
        except (ObjectDoesNotExist, ValueError, TypeError):
            return Http404
        
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number,
        username, and password.
        """
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have a email.')
        if password is None:
            raise TypeError('Users must have a password.')
        
        user = self.model(username=username, 
                          email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, username, email, password, **kwargs):
        """Create and return a `User` superuser (admin) permissions."""
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have a username.')
        
        user = self.create_user(
            username = username, 
            email = self.normalize_email(email), 
            password = password, **kwargs)
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, db_index=True, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    bio = models.TextField(null=True)
    avatar = models.ImageField(null=True, blank=True, upload_to=user_directory_path)
    post_liked = models.ManyToManyField(
        "core_post.Post",
        related_name="liked_by"
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_Label):
        return True
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    
    def like(self, post):
        """Like `post` if it hasn't been done yet"""
        return self.post_liked.add(post)
    
    def remove_like(self, post):
        """Remove a like from a `post`"""
        return self.post_liked.remove(post)
    
    def has_liked(self, post):
        """Return True if the user has liked a `post`; else return False"""
        return self.post_liked.filter(pk=post.pk).exists()
    
    
    

