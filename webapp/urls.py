from django.urls import path
from . import views

app_name = 'webapp'
urlpatterns = [
    path('', views.index, name='index'),
    path('blog/', views.blog, name='blog'),
    path('blog_details/', views.blog_details, name='blog-details'),
    path('services_details/', views.services_details, name='services-details'),
    path('portfolio_details/', views.portfolio_details, name='portfolio-details'),
]