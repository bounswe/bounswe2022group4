package com.bounswe.heka.register

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.RegisterRequest
import com.bounswe.heka.network.Api
import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.PasswordValidator
import com.bounswe.heka.utils.UsernameValidator
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor(): ViewModel() {

    val email = MutableLiveData<String>()
    val username = MutableLiveData<String>()
    val password = MutableLiveData<String>()
    val emailError = MutableLiveData<String>()
    val usernameError = MutableLiveData<String>()
    val passwordError = MutableLiveData<String>()
    val signUpButtonEnabled = MutableLiveData<Boolean>()
    val toastMessage = MutableLiveData<String>()
    val signInSuccessful = MutableLiveData<Boolean>()
    val loading = MutableLiveData<Boolean>()

    private val emailValidator = EmailValidator()
    private val usernameValidator = UsernameValidator()
    private val passwordValidator = PasswordValidator()
    init {
        email.observeForever {
            emailError.value = emailValidator.validate(it)
            signUpButtonEnabled.value = isSignUpButtonEnabled()
        }
        password.observeForever {
            passwordError.value = passwordValidator.validate(it)
            signUpButtonEnabled.value = isSignUpButtonEnabled()
        }
        username.observeForever {
            usernameError.value = usernameValidator.validate(it)
            signUpButtonEnabled.value = isSignUpButtonEnabled()
        }
        signUpButtonEnabled.value = false
    }

    private fun isSignUpButtonEnabled(): Boolean? {
        return emailValidator.validate(email.value) == null &&
                passwordValidator.validate(password.value) == null &&
                usernameValidator.validate(username.value) == null
    }

    fun onSignupButtonClick() {
        viewModelScope.launch {
            try {
                loading.value = true
                val response = Api.retrofitService.register(RegisterRequest(name = username.value!!, email = email.value!!, password = password.value!!))
                if(response.email is Array<*>) {
                    emailError.value = "Email already exists"
                    toastMessage.value = "Email already exists"
                } else {
                    toastMessage.value = "Registration successful"
                    delay(1000)
                    signInSuccessful.value = true
                }
                Log.d("LoginViewModel", "onSignupButtonClick: $response")
            } catch (e: Exception) {
                Log.e("LoginViewModel", "onSignupButtonClick: $e")
                toastMessage.value = "$e"
                loading.value = false
            }
        }
    }
}