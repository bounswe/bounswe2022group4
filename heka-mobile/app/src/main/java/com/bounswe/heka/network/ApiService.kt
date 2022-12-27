package com.bounswe.heka.network
import com.bounswe.heka.data.*
import com.bounswe.heka.data.chat.*
import com.bounswe.heka.data.post.*
import retrofit2.http.*

private const val BASE_URL = "http://3.72.25.175:8080/api/"
private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()
private val retrofit = Retrofit.Builder()
    .addConverterFactory(MoshiConverterFactory.create(moshi))
    .baseUrl(BASE_URL)
    .build()
interface ApiService {
    @POST("user/register")
    suspend fun register(@Body request: RegisterRequest): RegisterResponse
    @POST("user/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
    @GET("user/home")
    suspend fun home() : HomeResponse
    @GET("user/logout")
    suspend fun logout(): LogoutResponse
}


    @POST("post/create-post")
    suspend fun createPost(@Body request: CreatePostRequest): CreatePostResponse
    @GET("post/list-posts")
    suspend fun listPosts(): List<ListPostsResponse>
    @POST("post/create-comment/{slug}/")
    suspend fun createComment(@Path("slug") slug:String, @Body request: CreateCommentRequest): CreateCommentResponse
    @POST("post/delete-comment/{slug}/{id}")
    suspend fun deleteComment(@Path("slug") slug:String, @Path("id") id:Int): DeleteCommentResponse
    @POST("post/delete/{slug}/")
    suspend fun deletePost(@Path("slug") slug:String): DeletePostResponse
    @GET("post/fetch-comment/{slug}/{id}")
    suspend fun fetchComment(@Path("slug") slug:String, @Path("id") id: String): FetchCommentsResponse
    @POST("post/downvote-comment/{slug}/{id}")
    suspend fun downvoteComment(@Path("slug") slug:String, @Path("id") id:Int): DownvoteCommentResponse
    @POST("post/downvote-post/{slug}/")
    suspend fun downvotePost(@Path("slug") slug:String): DownvotePostResponse
    @POST("post/upvote-comment/{slug}/{id}")
    suspend fun upvoteComment(@Path("slug") slug:String, @Path("id") id:Int): UpvoteCommentResponse
    @POST("post/upvote-post/{slug}/")
    suspend fun upvotePost(@Path("slug") slug:String): UpvotePostResponse
    @POST("post/update-comment/{slug}/{id}")
    suspend fun updateComment(@Path("slug") slug:String, @Path("id") id:Int, @Body request: UpdateCommentRequest): UpdateCommentResponse
    @POST("post/update/{slug}/")
    suspend fun updatePost(@Path("slug") slug:String, @Body request: UpdatePostRequest): UpdatePostResponse
    @GET("post/fetch-comments/{slug}/")
    suspend fun fetchComments(@Path("slug") slug:String): List<FetchCommentsResponse>
    @GET("post/fetch/{slug}/")
    suspend fun fetchPost(@Path("slug") slug:String): FetchPostResponse
    @GET("annotation/image/post/{slug}")
    suspend fun getImageAnnotations(@Path("slug") slug:String): List<AnnotationResponse>
    @POST("annotation/image/post/{slug}")
    suspend fun postImageAnnotation(@Path("slug") slug:String, @Body request: AnnotationResponse): AnnotationResponse
    @GET("annotation/text/post/{slug}")
    suspend fun getTextAnnotations(@Path("slug") slug:String): List<AnnotationResponse>
    @POST("annotation/text/post/{slug}")
    suspend fun postTextAnnotation(@Path("slug") slug:String, @Body request: AnnotationResponse): AnnotationResponse


    @GET("search/user?")
    suspend fun searchUser(@Query("query") query: String): List<SearchUserResponse>
    @GET("search/post?")
    suspend fun searchPost(@Query("query") query: String): List<SearchPostResponse>




    @GET("chat/fetch/users")
    suspend fun fetchUsers(): FetchUsersResponse
    @POST("chat/fetch/message")
    suspend fun fetchMessage(@Body request: FetchMessageRequest): List<FetchMessageResponse>
    @POST("chat/send/message")
    suspend fun sendMessage(@Body request: SendMessageRequest): SendMessageResponse
}