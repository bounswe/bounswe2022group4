package com.bounswe.heka.network
import com.bounswe.heka.data.*
import com.bounswe.heka.data.chat.*
import com.bounswe.heka.data.post.ListPostsResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {
    @POST("user/register")
    suspend fun register(@Body request: RegisterRequest): RegisterResponse
    @POST("user/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
    @GET("user/home")
    suspend fun home() : HomeResponse
    @POST("user/logout")
    suspend fun logout(): LogoutResponse
    @POST("post/create-post")
    suspend fun createPost(@Body request: CreatePostRequest): CreatePostResponse
    @GET("post/list-posts")
    suspend fun listPosts(): ListPostsResponse
    @GET("chat/fetch/users")
    suspend fun fetchUsers(): FetchUsersResponse
    @POST("chat/fetch/message")
    suspend fun fetchMessage(@Body request: FetchMessageRequest): List<FetchMessageResponse>
    @POST("chat/send/message")
    suspend fun sendMessage(@Body request: SendMessageRequest): SendMessageResponse
}