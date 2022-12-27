package com.bounswe.heka.profile

data class ProfileState (
    val email: String?,
    val username: String,
    val name: String,
    val age: Int?,
    val profile_image: String?,
    val is_expert: Boolean? = false,
    val is_admin: Boolean?,
    val date_joined: String?,
    val last_login: String?,
        )