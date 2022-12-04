package com.bounswe.heka.data

data class LoginResponse (
    val message: String,
    val token: String?,
    val email: String?,
    val username: String?
)