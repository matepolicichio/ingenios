from django.contrib import admin
from .models import Survey, Question, Choice, Response, Answer

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3  # Number of choices displayed by default

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]

class SurveyAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')

class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('text', 'question')

class AnswerInline(admin.TabularInline):
    model = Answer

class ResponseAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'survey', 'submission_time')
    inlines = [AnswerInline]

class AnswerAdmin(admin.ModelAdmin):
    list_display = ('response', 'question', 'choice')

admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Response, ResponseAdmin)
admin.site.register(Answer, AnswerAdmin)
