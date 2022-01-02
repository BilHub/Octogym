from django.urls import path, include
from .views import SignUp, LogoutUser
urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('signup/', SignUp.as_view(), name='sign_up'),
    path('logout/', LogoutUser.as_view(), name='logout')
]