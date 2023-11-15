import pytest

from core.fixtures.user import user 
from core.fixtures.post import post
from core.comment.models import Comment

# Create your tests here.
@pytest.mark.django_db
def test_create_comment(user, post):
    comment = Comment.objects.create(
        author=user, post=post, body="Testing comment"
    )
    assert comment.author == user
    assert comment.post == post
    assert comment.body == "Testing comment"