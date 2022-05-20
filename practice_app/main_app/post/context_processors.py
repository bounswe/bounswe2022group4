from .models import Category


def header_categories(request):
    return {'cat_menu': Category.objects.all().order_by('name')}