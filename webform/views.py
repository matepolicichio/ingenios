from django.shortcuts import render, redirect
from .models import Survey, Question, Choice, Response, Answer
from .forms import SurveyForm, QuestionForm

def survey_list(request):
    surveys = Survey.objects.all()
    return render(request, 'webform/survey_list.html', {'surveys': surveys})

def take_survey(request, survey_id):
    survey = Survey.objects.get(id=survey_id)
    questions = survey.question_set.all()

    if request.method == 'POST':
        form = SurveyForm(request.POST)
        if form.is_valid():
            response = form.save(commit=False)
            response.survey = survey
            response.user_id = 1  # Replace with actual user ID
            response.save()

            for question in questions:
                choice_id = request.POST.get(f'question_{question.id}')
                choice = Choice.objects.get(id=choice_id)
                Answer.objects.create(response=response, question=question, choice=choice)

            return redirect('webform:survey_list')
    else:
        form = SurveyForm()

    return render(request, 'webform/take_survey.html', {'survey': survey, 'questions': questions, 'form': form})
