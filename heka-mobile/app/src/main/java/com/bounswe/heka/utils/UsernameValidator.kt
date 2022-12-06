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

class NameValidator {
    fun validate(name: String?) = when {
        name == null -> "Name cannot be empty"
        name.isBlank() -> "Name cannot be empty"
        name.length < 3 -> "Name cannot be this short"
        else -> null
    }

    private fun String.containsValidCharacters() = all {
        it.isLowerCase() || it.isDigit() || it == '_'
    }
}

