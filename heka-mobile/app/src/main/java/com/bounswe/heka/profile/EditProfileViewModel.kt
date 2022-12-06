package com.bounswe.heka.profile

import android.graphics.Bitmap
import android.util.Base64
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.ProfilePutRequest
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.utils.EmailValidator
import com.bounswe.heka.utils.NameValidator
import com.bounswe.heka.utils.UsernameValidator
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import javax.inject.Inject

class EditProfileViewModel @Inject constructor() : ViewModel() {
    val activityResult = MutableLiveData<Boolean>()
    val loading = MutableLiveData<Boolean>()

    val emailError = MutableLiveData<String>()
    val usernameError = MutableLiveData<String>()
    val nameError = MutableLiveData<String>()

    val username = MutableLiveData<String>()
    val name = MutableLiveData<String>()
    val email = MutableLiveData<String>()
    val age = MutableLiveData<String>()
    val profile_image = MutableLiveData<String?>()
    val editButtonEnabled = MutableLiveData<Boolean>()


    var oldUsername: String? = null
    private val emailValidator = EmailValidator()
    private val usernameValidator = UsernameValidator()
    private val nameValidator = NameValidator()

    init {
        email.observeForever {
            emailError.value = emailValidator.validate(it)
            editButtonEnabled.value = isEditButtonEnabled()
        }
        username.observeForever {
            usernameError.value = usernameValidator.validate(it)
            editButtonEnabled.value = isEditButtonEnabled()
        }
        name.observeForever {
            nameError.value = nameValidator.validate(it)
            editButtonEnabled.value = isEditButtonEnabled()

        }
        editButtonEnabled.value = false
    }

    private fun isEditButtonEnabled(): Boolean? {
        return emailValidator.validate(email.value) == null &&
                usernameValidator.validate(username.value) == null &&
                nameValidator.validate(name.value) == null
    }


    fun fetchProfile(usernamex: String) {
        viewModelScope.launch {
            ApiClient.get().getProfile(usernamex).let {
                oldUsername = it.username
                email.value = it.email
                username.value = it.username
                name.value = it.name
                age.value = it.age?.toString()
                profile_image.value = it.profile_image
            }

        }
    }

    fun editProfile() {
        loading.value =true
        editButtonEnabled.value = false
        viewModelScope.launch {
            try {
                ApiClient.get().setProfile(
                    oldUsername!!, ProfilePutRequest(
                        email = email.value!!,
                        username = username.value!!,
                        name = name.value!!,
                        age = age.value?.toInt(),
                        profile_image = profile_image.value
                    )
                ).let {
                    it.username.let { newUsername ->
                        username.value = newUsername
                        activityResult.value = true
                    }
                }
            } catch (e: Exception) {
                Log.v("editP", e.message.toString())
                editButtonEnabled.value = true
                loading.value =false
            }
            editButtonEnabled.value = true
            loading.value =false

        }

    }
    fun setImage(it: Bitmap) {
        val baos = ByteArrayOutputStream()
        it.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val b = baos.toByteArray()
        profile_image.value = "data:image/png;base64,${Base64.encodeToString(b, Base64.DEFAULT)}"
    }

}