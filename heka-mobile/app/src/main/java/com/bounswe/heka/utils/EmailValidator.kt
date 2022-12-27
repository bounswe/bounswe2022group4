package com.bounswe.heka.utils

class EmailValidator {
    fun validate(email: String?) = when {
        email == null -> "Email cannot be empty"
        email.isBlank() -> "Email cannot be empty"
        !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() -> "Email is not valid"
        else -> null
    }
}

class CodeValidator {
    fun validate(code: String?) = when {
        code == null -> "Code cannot be empty"
        code.isBlank() -> "Code cannot be empty"
        else -> null
    }
}