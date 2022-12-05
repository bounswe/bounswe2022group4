package com.bounswe.heka.data

import java.sql.Timestamp

data class ProfileResponse(
    val email: String,
    val username: String,
    val name: String,
    val age: Int? = null,
    val profile_image: String?= null,
    val is_expert: Boolean?= null,
    val is_admin: Boolean?= null,
    val date_joined: String?= null,
    val last_login: String?= null,
)