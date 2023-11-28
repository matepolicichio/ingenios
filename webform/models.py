from django.db import models

class Survey(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Question(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)

    def __str__(self):
        return self.text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)

    def __str__(self):
        return self.text

class Response(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    user_id = models.IntegerField()
    submission_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response for '{self.survey}' by User {self.user_id}"

class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)

    def __str__(self):
        return f"Answer for '{self.question}' in Response {self.response.id}"
