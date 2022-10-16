package com.bounswe.heka.login

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.network.Api
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(): ViewModel() {
    val text = MutableLiveData<String>("Hello World")
    public fun ping() {
        viewModelScope.launch {
            try {
                val ping = Api.retrofitService.getPing()
                text.value = ping.data
            } catch (e: Exception) {
                Log.d("LoginViewModel", e.toString())
            }
        }
    }
}