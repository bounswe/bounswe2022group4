from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from users.models import User
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer # Message Serializer Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class FetchView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @swagger_auto_schema()

    def post(self,request):
        data = JSONParser().parse(request)
        user = User.objects.filter(username=data["receiver"]).first()
        messages = Message.objects.filter(sender_id=request.user.id, receiver=user.id) | Message.objects.filter(sender=user.id, receiver_id=request.user.id)
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)

class SendView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    @swagger_auto_schema()    
    
    def post(self,request):
        data = JSONParser().parse(request)
        data["sender"] = request.user.username
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)
class MessagedUsersView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    @swagger_auto_schema()    

    def get(self, request):
        user = request.user.id

        receiver_list = Message.objects.filter(sender_id = user).values("receiver")  
        sender_list = Message.objects.filter(receiver_id = user).values("sender")

        response_list = []

        for i in range (len(receiver_list)):
            username = User.objects.filter(id=receiver_list[i]["receiver"]).values("username")
            response_list.append(username[0]["username"])
        
        for i in range (len(sender_list)):
            username = User.objects.filter(id=sender_list[i]["sender"]).values("username")
            response_list.append(username[0]["username"])
        response = list(set(response_list))
        response.sort()
        return JsonResponse({"user_list": response}, safe=False)