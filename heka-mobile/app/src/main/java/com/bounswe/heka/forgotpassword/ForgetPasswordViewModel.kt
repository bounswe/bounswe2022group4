package com.bounswe.heka.forgotpassword




import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.ForgetPasswordRequest
import com.bounswe.heka.data.ForgetPasswordResponse
import com.bounswe.heka.data.LoginRequest
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.utils.EmailValidator

import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ForgetPasswordViewModel @Inject constructor(): ViewModel() {

    val email = MutableLiveData<String>()
    val emailError = MutableLiveData<String>()
    val sendButtonEnabled = MutableLiveData<Boolean>()
    val toastMessage = MutableLiveData<String>()
    val sentVerification = MutableLiveData<ForgetPasswordResponse>()
    val loading = MutableLiveData<Boolean>()

    private val emailValidator = EmailValidator()


    init {
        email.observeForever {
            emailError.value = emailValidator.validate(it)
            sendButtonEnabled.value = isLoginButtonEnabled()
        }
        sendButtonEnabled.value = false
    }

    private fun isLoginButtonEnabled(): Boolean? {
        return emailValidator.validate(email.value) == null

    }

    fun onSendButtonClick() {
        viewModelScope.launch {
            try {
                loading.value = true
                val response = ApiClient.get().forgetPassword(ForgetPasswordRequest(email = email.value!!))

                sentVerification.value = response

            } catch (e: Exception) {
                toastMessage.value = "There is no user with ${email.value}"
                Log.v("xxd", e.message.toString())
            }
            loading.value = false
        }
    }
}