from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'webapp/index.html')

# def blog(request):
#     return render(request, 'webapp/blog.html')

# def blog_details(request):
#     return render(request, 'webapp/blog-details.html')

# def services_details(request):
#     return render(request, 'webapp/services-details.html')

# def portfolio_details(request):
#     return render(request, 'webapp/portfolio-details.html')