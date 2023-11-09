from rest_framework import routers
from core.user.viewsets import UserViewSet
from core.auth.viewsets.register import RegisterViewSet
from core.auth.viewsets.login import LoginViewSet

router = routers.SimpleRouter()

#USER
router.register(r"user", UserViewSet, basename='user')
#AUTH
router.register(r"auth/register", RegisterViewSet, basename='auth-register')
router.register(r"auth/login", LoginViewSet, basename='auth-login')


urlpatterns = [
    *router.urls,
]