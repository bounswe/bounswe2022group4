package com.bounswe.heka.network
import com.bounswe.heka.data.*
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

private const val BASE_URL = "http://3.75.133.58:8080/api/"
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

object Api {
    val retrofitService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}