package com.bounswe.heka.login

data class LoginState (
    val username: String = "",
    val password: String = "",
    val isUsernameValid: Boolean = false,
    val isPasswordValid: Boolean = false,
    val isDataValid: Boolean = false
)