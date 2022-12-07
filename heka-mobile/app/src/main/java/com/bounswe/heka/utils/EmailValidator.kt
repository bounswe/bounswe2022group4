package com.bounswe.heka.utils

import java.util.regex.Pattern

class EmailValidator {
    val EMAIL_PATTERN: Pattern = Pattern.compile(
        "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                "\\@" +
                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                "(" +
                "\\." +
                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                ")+"
    )
    fun validate(email: String?) = when {
        email == null -> "Email cannot be empty"
        email.isBlank() -> "Email cannot be empty"
        !EMAIL_PATTERN.matcher(email).matches() -> "Email is not valid"
        else -> null
    }
}