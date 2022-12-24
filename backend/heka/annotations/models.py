from django.db import models


#
# {
#   "@context": "http://www.w3.org/ns/anno.jsonld",
#   "id": "http://example.org/anno20",
#   "type": "Annotation",
#   "body": {
#     "source": "http://example.org/video1",
#     "purpose": "describing",
#     "selector": {
#       "type": "FragmentSelector",
#       "conformsTo": "http://www.w3.org/TR/media-frags/",
#       "value": "xywh=50,50,640,480"
#     }
#   },
#   "target": "http://example.org/image1"
# }
class ImageAnnotation(models.Model):
    post_slug = models.TextField(null=False, blank=False)
    # Source -> Post slug
    json = models.JSONField()
