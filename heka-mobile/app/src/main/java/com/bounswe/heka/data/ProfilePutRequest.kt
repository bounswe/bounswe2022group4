package com.bounswe.heka.data

import java.sql.Timestamp

data class ProfilePutRequest(
    var email: String,
    var username: String,
    var name: String,
    var age: Int?,
    var profile_image: String?,
    val is_expert: Boolean?=null,
    val is_admin: Boolean?=null,
    val date_joined: String?=null,
    val last_login: String? =null,
    )