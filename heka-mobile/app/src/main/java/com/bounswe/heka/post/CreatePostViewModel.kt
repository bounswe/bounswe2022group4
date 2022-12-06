package com.bounswe.heka.post

import android.graphics.Bitmap
import android.util.Base64
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.CreatePostRequest
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import javax.inject.Inject


@HiltViewModel
class CreatePostViewModel @Inject constructor(): ViewModel() {
    val title = MutableLiveData<String>()
    val content = MutableLiveData<String>()
    val tags = MutableLiveData<String>()
    val location = MutableLiveData<String>()
    val imageUri = MutableLiveData<String>()
    val imageBase64 = MutableLiveData<String>()
    val activityResult = MutableLiveData<Boolean>()
    init {

    }

    fun setImage(it: Bitmap) {
        val baos = ByteArrayOutputStream()
        it.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val b = baos.toByteArray()
        imageBase64.value = "data:image/png;base64,${Base64.encodeToString(b, Base64.DEFAULT)}"
    }

    fun createPost() {
        Log.d("CreatePostViewModel", "createPost: ${title.value} ${content.value} ${tags.value} ${location.value} ${imageBase64.value}")
        viewModelScope.launch {
            try {
                val response = ApiClient.get().createPost(
                    CreatePostRequest(
                        title.value,
                        content.value,
                        tags.value,
                        location.value,
                        imageBase64.value
                    )
                )
                Log.d("CreatePostViewModel", "createPost: ${response.title}")
            } catch (e: Exception) {
                Log.d("CreatePostViewModel", "createPost: ${e.message}")
            }
            activityResult.value = true

        }

    }
    fun onTagSelected(value: String) {
        tags.value = value
    }
}