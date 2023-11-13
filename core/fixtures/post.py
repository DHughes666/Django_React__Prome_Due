import pytest

from core.fixtures.user import user
from core.post.models import Post

@pytest.fixture
def post(db, user):
    return Post.objects.create(
        author=user, title="Test title", body="Test for post body"
    )