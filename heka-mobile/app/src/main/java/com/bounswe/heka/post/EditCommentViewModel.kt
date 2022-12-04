package com.bounswe.heka.post

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.post.FetchPostResponse
import com.bounswe.heka.data.post.UpdatePostRequest
import com.bounswe.heka.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

class EditCommentViewModel @Inject constructor(): ViewModel() {
    val comment = MutableLiveData<FetchPostResponse>()
    val activityResult = MutableLiveData<Boolean>()

    fun fetchPost(slug: String) {
        viewModelScope.launch {
            comment.value = ApiClient.get().fetchPost(slug)
        }
    }
    fun editPost() {
        viewModelScope.launch {
            ApiClient.get().updatePost(comment.value!!.slug, UpdatePostRequest(
                comment.value!!.title,
                comment.value!!.body,
                comment.value!!.category,
                comment.value!!.location,
                comment.value!!.image
            ))
        }
        activityResult.value = true
    }
    fun deletePost() {
        viewModelScope.launch {
            ApiClient.get().deletePost(comment.value!!.slug)
        }
        activityResult.value = true
    }

}