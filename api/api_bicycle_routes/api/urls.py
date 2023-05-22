from django.urls import path

from api.views import (CommentsAPI, Login, RouteAllAPI, RouteAPI, SuscriptionAPI,
                       UserDeleteUser, UserRegister, GetRouteUpdate, UserManagement, 
                       RouteDesactivateRouteAPI,RouteActiveAPI, UserCodeRecovery,filterRoutes,
                       filterByDate,getUsersBy)

urlpatterns = [
    path('comments',CommentsAPI.as_view()),
    path('register',UserRegister.as_view()),
    path('login',Login.as_view()),
    path('route',RouteAPI.as_view()),
    path('route_all',RouteAllAPI.as_view()),
    path('subscribe',SuscriptionAPI.as_view()),
    path('user_management',UserManagement.as_view()),
    path('delete/user',UserDeleteUser.as_view()),
    path('get_route_to_edit',GetRouteUpdate.as_view()),
    path('desactivate_route',RouteDesactivateRouteAPI.as_view()),
    path('get_routes_activated',RouteActiveAPI.as_view()),
    path('code_recovery',UserCodeRecovery.as_view()),
    path('route_filter',filterRoutes.as_view()),
    path('route_by_date',filterByDate.as_view()),
    path('usersByroutes',getUsersBy.as_view()),
]