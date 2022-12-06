package com.bounswe.heka

import com.bounswe.heka.utils.EmailValidator
import junit.framework.Assert.assertTrue
import org.junit.Test

class EmailValidatorUnitTest {
    @Test
    fun emailValidator_CorrectEmailSimple_ReturnsTrue() {
        val validEmails = listOf("heka@heka.com","haka.hake123@heke.com.tr","heka@eee.com")
        val invalidEmails = listOf(null,"","fff", "@fvmfk.fff", "fff@fff")
        val emailValidator = EmailValidator()
        for (email in validEmails) {
            assertTrue(emailValidator.validate(email) == null)
        }
        for (email in invalidEmails) {
            assertTrue(emailValidator.validate(email) != null)
        }
    }
}