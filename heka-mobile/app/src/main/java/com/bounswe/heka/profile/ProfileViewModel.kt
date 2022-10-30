package com.bounswe.heka.profile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.network.Api
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(): ViewModel() {

    val logout = MutableLiveData<Boolean>()
    fun logout() {
        viewModelScope.launch {
            try {
                val response = Api.retrofitService.logout()
                logout.value = true
            } catch (e: Exception) {

            }
        }
    }
}