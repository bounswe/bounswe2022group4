package com.bounswe.heka.post

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.post.FetchPostResponse
import com.bounswe.heka.data.post.UpdatePostRequest
import com.bounswe.heka.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

class EditPostViewModel @Inject constructor(): ViewModel() {
    val post = MutableLiveData<FetchPostResponse>()
    val activityResult = MutableLiveData<Boolean>()
    //val expertAttempt = MutableLiveData<Boolean>(false)


    fun fetchPost(slug: String) {
        viewModelScope.launch {
            post.value = ApiClient.get().fetchPost(slug)
        }
    }
    fun editPost() {
        viewModelScope.launch {
            ApiClient.get().updatePost(post.value!!.slug, UpdatePostRequest(
                post.value!!.title,
                post.value!!.body,
                post.value!!.category,
                post.value!!.location,
                post.value!!.image
            ))
        }
        activityResult.value = true
    }
    fun deletePost() {
        viewModelScope.launch {
            ApiClient.get().deletePost(post.value!!.slug)
        }
        activityResult.value = true
    }
    fun onTagSelected(value: String) {
        post.value?.category = value
    }

}