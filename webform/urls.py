from django.urls import path
from .views import survey_list, take_survey

app_name = 'webform'
urlpatterns = [
    path('surveys/', survey_list, name='survey_list'),
    path('surveys/<int:survey_id>/', take_survey, name='take_survey'),
]