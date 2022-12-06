package com.bounswe.heka.data.user

data class FetchUserResponse(
    val email:String,
    val username:String,
    val is_expert: Boolean,
    val date_joined:String,
    val is_admin:Boolean,
    val age: Int,
    val name: String,
    val last_login: String,
    val profile_image: String,
)