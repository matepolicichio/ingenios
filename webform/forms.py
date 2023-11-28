from django import forms
from .models import Answer, Response, Survey, Question, Choice

class SurveyForm(forms.ModelForm):
    class Meta:
        model = Response
        fields = []

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['choice']
        widgets = {
            'choice': forms.RadioSelect()
        }

    def __init__(self, *args, **kwargs):
        super(QuestionForm, self).__init__(*args, **kwargs)
        self.fields['choice'].queryset = Choice.objects.none()
