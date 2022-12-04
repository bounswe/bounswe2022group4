package com.bounswe.heka.post

import android.graphics.Bitmap
import android.util.Base64
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.CreatePostRequest
import com.bounswe.heka.data.post.CreateCommentRequest
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import javax.inject.Inject


@HiltViewModel
class CreateCommentViewModel @Inject constructor(): ViewModel() {
    val slug = MutableLiveData<String>()
    val content = MutableLiveData<String>()

    val activityResult = MutableLiveData<Boolean>()


    fun createPost( slug: String) {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().createComment(
                    slug,
                    CreateCommentRequest(
                        content.value!!,
                    )
                )
            } catch (e: Exception) {
            }
            activityResult.value = true

        }

    }
}