from django.db import models

class ImageAnnotation(models.Model):
    post_slug = models.TextField(null=False, blank=False)
    # Source -> Post slug
    json = models.JSONField()

class TextAnnotation(models.Model):
    post_slug = models.TextField(null=False, blank=False)
    # Source -> Post slug
    json = models.JSONField()
