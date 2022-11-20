package com.bounswe.heka.login

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.LoginRequest
import com.bounswe.heka.data.LoginResponse
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.PasswordValidator
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(): ViewModel() {

    val email = MutableLiveData<String>()
    val password = MutableLiveData<String>()
    val emailError = MutableLiveData<String>()
    val passwordError = MutableLiveData<String>()
    val loginButtonEnabled = MutableLiveData<Boolean>()
    val toastMessage = MutableLiveData<String>()
    val loginSuccessful = MutableLiveData<LoginResponse>()
    val loading = MutableLiveData<Boolean>()

    private val emailValidator = EmailValidator()
    private val passwordValidator = PasswordValidator()
    init {
        email.observeForever {
            emailError.value = emailValidator.validate(it)
            loginButtonEnabled.value = isLoginButtonEnabled()
        }
        password.observeForever {
            passwordError.value = passwordValidator.validate(it)
            loginButtonEnabled.value = isLoginButtonEnabled()
        }
        loginButtonEnabled.value = false
    }

    private fun isLoginButtonEnabled(): Boolean? {
        return emailValidator.validate(email.value) == null &&
                passwordValidator.validate(password.value) == null
    }

    fun onLoginButtonClick() {
        viewModelScope.launch {
            try {
                loading.value = true
                val response = ApiClient.get().login(LoginRequest(email = email.value!!, password = password.value!!))

                toastMessage.value = response.message

                loginSuccessful.value = response

            } catch (e: Exception) {
                toastMessage.value = "$e"
            }
            loading.value = false
        }
    }
}