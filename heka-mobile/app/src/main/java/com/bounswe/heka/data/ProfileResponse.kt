package com.bounswe.heka.data

import java.sql.Timestamp

data class ProfileResponse(
    val email: String,
    val username: String,
    val name: String,
    val age: Int?,
    val profile_image: String?,
    val is_expert: Boolean?,
    val is_admin: Boolean?,
    val date_joined: Timestamp?,
    val last_login: Timestamp?,
)