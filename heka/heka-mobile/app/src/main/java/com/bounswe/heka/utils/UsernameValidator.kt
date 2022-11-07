package com.bounswe.heka.utils

class UsernameValidator {
    fun validate(username: String?) = when {
        username == null -> "Username cannot be empty"
        username.isBlank() -> "Username cannot be empty"
        username.length < 3 -> "Username cannot be this short"
        !username.containsValidCharacters() -> "Username can only include lowercase, digit and _ character"
        else -> null
    }

    private fun String.containsValidCharacters() = all {
        it.isLowerCase() || it.isDigit() || it == '_'
    }
}

