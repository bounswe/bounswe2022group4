package com.bounswe.heka.data

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    val is_expert: Boolean = false,
)
