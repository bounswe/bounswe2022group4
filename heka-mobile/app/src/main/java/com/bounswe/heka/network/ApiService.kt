package com.bounswe.heka.network
import com.bounswe.heka.data.*
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
    @GET("user/logout")
    suspend fun logout(): LogoutResponse
}