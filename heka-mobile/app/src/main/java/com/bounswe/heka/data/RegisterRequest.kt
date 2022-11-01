package com.bounswe.heka.data

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String
)
