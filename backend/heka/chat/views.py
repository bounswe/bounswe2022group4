from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer # Message Serializer Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def get(self,request, receiver=None):
        messages = Message.objects.filter(sender_id=request.user.id, receiver_id=receiver) | Message.objects.filter(sender_id=receiver, receiver_id=request.user.id)
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        print(type(messages))
        return JsonResponse(serializer.data, safe=False)

class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    @swagger_auto_schema()    
    
    def post(self,request):
        data = JSONParser().parse(request)
        data["sender"] = request.user.id
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)