from django.urls import path, include
from rest_framework import routers
from .views import RegisterView, ChangePasswordView, UpdateProfileView, LogoutView, LogoutAllView, UserAPIView, UserDetailAPIView, SignUpView, GetCSRFTOkent ,LoginView, LogOutView, DeleteUserView, GetUsersView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    # path('', include('rest_auth.urls')), 
    # path('register/', include('rest_auth.registration.urls'))
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogOutView.as_view()),
    path('users', GetUsersView.as_view()),
    path('delete/:id', DeleteUserView.as_view()),
    
    path('csrf_cookie', GetCSRFTOkent.as_view()),
    # path('', include('djoser.urls')), 
    # path('login/', include('djoser.urls.authtoken')),
    
    # path('users/', UserAPIView.as_view(),  name="user"),
    # path('users/<int:pk>/', UserDetailAPIView.as_view(), name="user-detail"),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('register/', RegisterView.as_view(), name='auth_register'),
    # path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
    # path('update_profile/<int:pk>/', UpdateProfileView.as_view(), name='auth_update_profile'),
    # path('logout/', LogoutView.as_view(), name='auth_logout'),
    # path('logout_all/', LogoutAllView.as_view(), name='auth_logout_all'),
]