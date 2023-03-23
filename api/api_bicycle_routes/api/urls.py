from api.views import Login, RouteAllAPI, RouteAPI, UserRegister,SuscriptionAPI,UserDeleteUser 
from django.urls import path

urlpatterns = [
    path('register',UserRegister.as_view()),
    path('login',Login.as_view()),
    path('route',RouteAPI.as_view()),
    path('route_all',RouteAllAPI.as_view()),
    path('subscribe',SuscriptionAPI.as_view()),
    path('delete/user',UserDeleteUser.as_view()),
]