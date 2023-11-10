from core.abstract.models import AbstractModel, AbstractManager
from django.db import models

# Create your models here.
class PostManager(AbstractManager):
    pass

class Post(AbstractModel):
    author = models.ForeignKey(
        to="core_user.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=225)
    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = PostManager()
    
    def __str__(self):
        return f"{self.title}"
    
    class Meta:
        db_table = "'core.post'"