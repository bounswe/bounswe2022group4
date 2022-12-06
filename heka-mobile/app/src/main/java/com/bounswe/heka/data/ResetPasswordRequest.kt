package com.bounswe.heka.data

data class ResetPasswordRequest(
    val code: String,
    val new_password: String,
    val confirm_new_password: String
)