package com.bounswe.heka.profile

import java.sql.Timestamp

data class ProfileState (
    val email: String?,
    val username: String,
    val name: String,
    val age: Int?,
    val profile_image: String?,
    val is_expert: Boolean?,
    val is_admin: Boolean?,
    val date_joined: String?,
    val last_login: String?,
        )