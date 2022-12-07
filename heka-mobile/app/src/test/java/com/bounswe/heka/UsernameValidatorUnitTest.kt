package com.bounswe.heka

import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.UsernameValidator
import junit.framework.Assert.assertTrue
import org.junit.Test

class UsernameValidatorUnitTest {
    @Test
    fun usernameValidator() {
        val validUsernames = listOf("aaa","bbb","fdmkbvdkfkdfv")
        val invalidUsernames = listOf(null,"","ff", "@fvmfk.fff", "fff@fe3434ff")
        val usernameValidator = UsernameValidator()
        for (username in validUsernames) {
            assertTrue(usernameValidator.validate(username) == null)
        }
        for (username in invalidUsernames) {
            assertTrue(usernameValidator.validate(username) != null)
        }
    }
}