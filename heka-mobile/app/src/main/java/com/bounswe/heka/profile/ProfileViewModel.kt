package com.bounswe.heka.profile

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.timeline.TimelineListItemState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ProfileViewModel @Inject constructor() : ViewModel() {
    val state = MutableLiveData<ProfileState>();
    var username = MutableLiveData<String?>();
    val logout = MutableLiveData<Boolean>();
    val isExpert = MutableLiveData<Boolean?>(null);

    fun logout() {
        println("logout")
        viewModelScope.launch {
            try {
                val response = ApiClient.get().logout()
                logout.value = true

            } catch (e: Exception) {
                logout.value = true
                println(e.message)

            }
        }
    }

    fun getProfile() {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().getProfile(username.value!!)
                state.value = response.let {
                    ProfileState(
                        it.email,
                        it.username,
                        it.name,
                        it.age,
                        it.profile_image,
                        it.is_expert,
                        it.is_admin,
                        it.date_joined,
                        it.last_login,
                    )
                }
            } catch (e: Exception) {
                Log.d("ProfileApi", "${e.message}")
            }
        }
    }


}