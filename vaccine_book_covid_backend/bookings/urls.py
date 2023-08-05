from django.urls import path
from . import views

urlpatterns = [
    path('user/login/', views.user_login, name='user_login'),
    path('user/signup/', views.user_signup, name='user_signup'),
    path('user/search_centers/', views.search_centers, name='search_centers'),
    path('user/apply_slot/', views.apply_slot, name='apply_slot'),
    path('user/logout/', views.user_logout, name='user_logout'),
    path('admin/login/', views.admin_login, name='admin_login'),
    path('admin/add_center/', views.add_center, name='add_center'),
    path('admin/dosage_details/', views.dosage_details, name='dosage_details'),
    path('admin/remove_center/', views.remove_center, name='remove_center'),
    path('vaccination_centers/', views.get_vaccination_centers, name='vaccination_centers'),
]
