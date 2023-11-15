import pytest

from core.fixtures.user import user
from core.post.models import Post

# Create your tests here.
@pytest.mark.django_db
def test_create_post(user):
    post = Post.objects.create(
        author=user, title="Test title", body="Test for post body")
    assert post.title == "Test title"
    assert post.body == "Test for post body"
    assert post.author == user