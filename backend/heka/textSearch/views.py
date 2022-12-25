from django.http import JsonResponse
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema 
from users.models import User
from posts.models import Post
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank

class SearchUserView(APIView):
    @swagger_auto_schema()

    def get(self,request):
        query = request.GET.get("query")
        
        response_data = {}
        response_data[f'users'] = {}
        
        if query:
            qs = User.objects.filter(username__contains=query).order_by("id")
            
            if qs:
                response_data[f'users']["error"] = False
                response_data[f'users']["count"] = len(qs)
                for i in range(len(qs)):
                    response_data[f'users'][i] = {}
                    response_data["users"][i]['id'] = qs[i].id
                    response_data["users"][i]['username'] = qs[i].username
                    response_data["users"][i]['email'] = qs[i].email
            else:
                response_data[f'users']["error"] = True
                response_data[f'users']["count"] = 0
                response_data[f'users']["message"] = "No user found with this query input!"
            return JsonResponse(response_data, safe=False)
        else:
            response_data[f'users']["error"] = True
            response_data[f'users']["count"] = 0
            response_data[f'users']["message"] = "No query input supplied!"
            return JsonResponse(response_data, safe=False)

class SearchPostView(APIView):
    @swagger_auto_schema()

    def get(self,request):
        myist = []

        error = {}
        
        query_list = request.GET.get("query").split()
        query = ""


        if request.GET.get("count"):
            count = int(request.GET.get("count"))
        else:
            count = 0

        for i in range(len(query_list)):
            query += query_list[i]
            query += ':*'  # Thanks to this line we can make partial matches 
            if i != len(query_list) - 1:
                query += " | "
                
        if query:
            vector = SearchVector('title', weight='A', config='english') + SearchVector('body', weight='B', config='english')
            q = SearchQuery(query, search_type="raw")
            qs = Post.objects.annotate(rank=SearchRank(vector, q)).filter(rank__gte=0.001).order_by("-rank")
            
            if count == 0: 
                count = len(qs)
            else:
                if count > len(qs):
                    count = len(qs)

            if qs:
                error["error"] = False
                error["count"] = count
                myist.append(error)
                for i in range(count):
                    data = {}
                    data["id"] = qs[i].id
                    data["title"] = qs[i].title
                    data["link"] = "http://3.72.25.175:3000/post/" + qs[i].slug
                    myist.append(data)
            else:
                error["error"] = True
                error["count"] = 0
                error["message"] = "No post found with this query input!"
                myist.append(error)
        else:
                error["error"] = True
                error["count"] = 0
                error["message"] = "No query input supplied"
                myist.append(error)
        return JsonResponse(myist, safe=False)

class SortPostView(APIView):
    @swagger_auto_schema()

    def get(self,request):

        if request.GET.get("count"):
            count = int(request.GET.get("count"))
        else:
            count = 0

        if request.GET.get("type"):
            type = request.GET.get("type")
        else:
            type = 0

        if type == 0:
            qs = Post.objects.filter().all().order_by("id")
        elif type.lower() == "create_date":
            qs = Post.objects.filter().all().order_by("-created_at")    # Last Created Post First
        elif type.lower() == "update_date":
            qs = Post.objects.filter().all().order_by("-last_update")    # Last Updated Post First
        elif type.lower() == "upvote_count":
            unsorted_results = Post.objects.filter().all()               # Most Upvoted Post First
            qs = sorted(unsorted_results, key= lambda t: Post.upvotes_for_sorting(t), reverse=True)
        elif type.lower() == "comment_count":
            unsorted_results = Post.objects.filter().all()
            qs = sorted(unsorted_results, key= lambda t: Post.comments_for_sorting(t), reverse=True)
        
        if count == 0 or count > len(qs):
            count = len(qs)
        
        response_data = {}
        response_data[f'posts'] = {}
        response_data[f'posts']["count"] = count

        myist = []
        for i in range(count):
            data = {}
            data["id"] = qs[i].id
            data["title"] = qs[i].title
            data["link"] = "http://3.72.25.175:3000/post/" + qs[i].slug
            myist.append(data)
            #response_data[f'posts'][i] = {}
            #response_data["posts"][i]['id'] = qs[i].id
            #response_data["posts"][i]['title'] = qs[i].title
            #response_data["posts"][i]['link'] = "http://3.72.25.175:3000/post/" + qs[i].slug
            
        #return JsonResponse(response_data, safe=False)
        return JsonResponse(list, safe=False)