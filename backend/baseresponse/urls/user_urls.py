from django.urls import path
from baseresponse.views import user_views as views


urlpatterns = [

    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('restore/', views.initiatePasswordReset, name='restore'),
    path('phone_register', views.phoneConfirmationRegister, name='phoneConfirmation'),
    path('phone_confirmation', views.phoneConfirmation, name='phoneConfirmation'),
    path('resetpassword/', views.passwordReset, name='password_reset'),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/exist', views.getUserByPhoneNumber, name="users-getUserByPhoneNumber"),
    path('profile/update/', views.updateUserProfile, name="users-profile-update"),
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),
    
    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]
