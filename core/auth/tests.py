import pytest
from rest_framework import status

from core.fixtures.user import user

# Create your tests here.

class TestAuthenticationViewSet:
    endpoint = "/api/auth/"

    @pytest.fixture
    def test_login(self, client, user):
        data = {
            "username": user.email,
            "password": "testpass321"
        }
        response = client.post(self.endpoint + "login/", data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']
        assert response.data['user']['id'] == user.public_id.hex
        assert response.data['user']['username'] == user.username
        assert response.data['user']['email'] == user.email


    @pytest.mark.django_db
    def test_register(self, client):
        data = {
            "username": "johndoe",
            "email": "johndoe@gmail.com",
            "password": "testpass321",
            "first_name": "John",
            "last_name": "Doe"
        }
        response = client.post(self.endpoint + "register/", data)
        assert response.status_code == status.HTTP_201_CREATED

    @pytest.fixture
    def test_refresh(self, client, user):
        data = {
            "username": user.email, 
            "password": "testpass321"
        }
        response = client.post(self.endpoint + "login/", data)

        assert response.status_code == status.HTTP_200_OK

        data_refresh = {
            "refresh": response.data['refresh']
        }

        respone = client.post(self.endpoint + "refresh/", data_refresh)

        assert respone.status_code == status.HTTP_200_OK
        assert response.data['access']