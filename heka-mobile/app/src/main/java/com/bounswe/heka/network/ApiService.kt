package com.bounswe.heka.network
import com.bounswe.heka.data.*
import com.bounswe.heka.data.chat.*
import com.bounswe.heka.data.post.*
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @POST("user/register")
    suspend fun register(@Body request: RegisterRequest): RegisterResponse
    @POST("user/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
    @POST("user/forget_password")
    suspend fun forgetPassword(@Body request: ForgetPasswordRequest): ForgetPasswordResponse
    @POST("user/reset_password")
    suspend fun resetPassword(@Body request: ResetPasswordRequest): ResetPasswordResponse
    @GET("user/profilepage/{username}")
    suspend fun getProfile(@Path("username") username:String) : ProfileResponse
    @PUT("user/profilepage/{username}")
    suspend fun setProfile(@Path("username") username:String, @Body request: ProfilePutRequest) : ProfileResponse
    @GET("user/home")
    suspend fun home() : HomeResponse
    @POST("user/logout")
    suspend fun logout(): LogoutResponse


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
    @POST("post/fetch-comment/{slug}/{id}")
    suspend fun fetchComment(@Path("slug") slug:String, @Path("id") id: String): FetchCommentResponse
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




    @GET("chat/fetch/users")
    suspend fun fetchUsers(): FetchUsersResponse
    @POST("chat/fetch/message")
    suspend fun fetchMessage(@Body request: FetchMessageRequest): List<FetchMessageResponse>
    @POST("chat/send/message")
    suspend fun sendMessage(@Body request: SendMessageRequest): SendMessageResponse
}