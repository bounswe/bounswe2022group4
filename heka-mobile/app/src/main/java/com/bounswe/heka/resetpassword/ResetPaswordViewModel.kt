package com.bounswe.heka.resetpassword


import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.*
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.utils.CodeValidator
import com.bounswe.heka.utils.DoublePasswordValidator
import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.PasswordValidator

import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ResetPaswordViewModel @Inject constructor(): ViewModel() {

    val password1 = MutableLiveData<String>()
    val password2 = MutableLiveData<String>()
    val verifycode = MutableLiveData<String>()
    val passwordError = MutableLiveData<String>()
    val codeError = MutableLiveData<String>()
    val sendButtonEnabled = MutableLiveData<Boolean>()
    val toastMessage = MutableLiveData<String>()
    val sentVerification = MutableLiveData<ResetPasswordResponse>()
    val loading = MutableLiveData<Boolean>()

    private val passwordValidator = DoublePasswordValidator()
    private val codeValidator = CodeValidator()


    init {
        password1.observeForever {
            passwordError.value = passwordValidator.validate(it, password2.value)
            sendButtonEnabled.value = isLoginButtonEnabled()
        }
        password2.observeForever {
            passwordError.value = passwordValidator.validate(it, password1.value)
            sendButtonEnabled.value = isLoginButtonEnabled()
        }
        verifycode.observeForever {
            codeError.value = codeValidator.validate(it)
            sendButtonEnabled.value = isLoginButtonEnabled()
        }
        sendButtonEnabled.value = false
    }

    private fun isLoginButtonEnabled(): Boolean? {
        return passwordValidator.validate(password1.value, password2.value) == null &&
                codeValidator.validate(verifycode.value) == null

    }

    fun onSendButtonClick() {
        viewModelScope.launch {
            try {
                loading.value = true
                val response = ApiClient.get().resetPassword(ResetPasswordRequest(verifycode.value!!, password1.value!!, password2.value!!))

                sentVerification.value = response

            } catch (e: Exception) {
                toastMessage.value = "Code is wrong"
                Log.v("xxd", e.message.toString())
            }
            loading.value = false
        }
    }
}