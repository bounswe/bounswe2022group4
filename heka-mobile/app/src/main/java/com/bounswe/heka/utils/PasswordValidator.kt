package com.bounswe.heka.utils

class PasswordValidator {
    fun validate(password: String?) = when {
        password == null -> "Password cannot be empty"
        password.isBlank() -> "Password cannot be empty"
        password.length < 8 -> "Password must be at least 8 characters long"
        !password.containsRequiredCharacters() -> "Password should contain one lowercase, one uppercase, one digit, one special character"
        else -> null
    }

    private fun String.containsRequiredCharacters() = containsDigit()
            && containsLowerCase()
            && containsUpperCase()
            && containsSpecialCharacter()

    private fun String.containsDigit() = any { it.isDigit() }

    private fun String.containsLowerCase() = any { it.isLowerCase() }

    private fun String.containsUpperCase() = any { it.isUpperCase() }

    private fun String.containsSpecialCharacter() = any { it.isSpecialCharacter() }

    private fun Char.isSpecialCharacter() = !isDigit() && !isLetter()
}

class DoublePasswordValidator{
    val pW: PasswordValidator = PasswordValidator()
    fun validate(password1: String?, password2: String?): String? {
        if (password1 == password2) {
            return pW.validate(password1)
        }
        return "Passwords should be equal!"
    }

}