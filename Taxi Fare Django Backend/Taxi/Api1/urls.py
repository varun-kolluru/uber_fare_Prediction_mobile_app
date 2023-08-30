from django.urls import path,include
from . import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("dist_cal_view",views.dist_cal_view),
    path("save_data",views.save_data_view),
    path("signup",view=views.UserRegister),
    #path("signin",view=views.UserLogin),
    path("signin",obtain_auth_token),
    path("signout",view=views.UserLogout),
]
    