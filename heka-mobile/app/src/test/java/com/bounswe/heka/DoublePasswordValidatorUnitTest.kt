package com.bounswe.heka

import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.PasswordValidator
import junit.framework.Assert
import org.junit.Test

class DoublePasswordValidatorUnitTest {
    @Test
    fun emailValidator_CorrectEmailSimple_ReturnsTrue() {
        val validPass = listOf<Pair<String,String>>(
            Pair("validPass123!","validPass123!"),
            Pair("another23Val!","another23Val!"),
            Pair("123aA!123","123aA!123"),)

        val unvalidEmails = listOf<Pair<String,String>>(
            Pair("noSpecialChar1","noSpecialChar1"),
            Pair("noDecimal!","noDecimal!"),
            Pair("nouppercase!123","nouppercase!123"),
            Pair("validBut1!different","validBut!2different"),
            )

        val doublepassvalidator = DoublePasswordValidator()
        for (p in validPass) {
            assert(doublepassvalidator.validate(p.first, p.second) == null)
        }
        for (p in unvalidEmails) {
            assert(doublepassvalidator.validate(p.first, p.second) != null)
        }
    }
}


//This func added temporary, in a branch which is waiting for pull request approval have this class in itself. After the merge this gonna be deleted
class DoublePasswordValidator{
    val pW: PasswordValidator = PasswordValidator()
    fun validate(password1: String?, password2: String?): String? {
        if (password1 == password2) {
            return pW.validate(password1)
        }
        return "Passwords should be equal!"
    }

}