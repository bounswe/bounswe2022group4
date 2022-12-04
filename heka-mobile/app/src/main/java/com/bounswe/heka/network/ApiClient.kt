package com.bounswe.heka.network

import android.content.Context
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory


private const val BASE_URL = "http://3.72.25.175:8080/api/"
//private const val BASE_URL = "http://172.20.10.2:8080/api/"

private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()
class ApiClient {

    private lateinit var apiService: ApiService
    private lateinit var context: Context
    fun getApiService(): ApiService {

        // Initialize ApiService if not initialized yet
        if (!::apiService.isInitialized) {
            val retrofit = Retrofit.Builder()
                .addConverterFactory(MoshiConverterFactory.create(moshi))
                .client(OkHttpClient.Builder().addInterceptor(AuthInterceptor(context)).build())
                .baseUrl(BASE_URL)
                .build()

            apiService = retrofit.create(ApiService::class.java)
        }

        return apiService
    }
    companion object {
        private lateinit var instance: ApiClient
        fun init(context: Context) {
            instance = ApiClient()
            instance.context = context
        }
        fun get(): ApiService {
            return instance.getApiService()
        }
    }
}