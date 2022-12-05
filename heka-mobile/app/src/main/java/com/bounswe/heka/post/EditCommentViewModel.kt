package com.bounswe.heka.post

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.post.FetchCommentResponse
import com.bounswe.heka.data.post.FetchPostResponse
import com.bounswe.heka.data.post.UpdateCommentRequest
import com.bounswe.heka.data.post.UpdatePostRequest
import com.bounswe.heka.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

class EditCommentViewModel @Inject constructor(): ViewModel() {
    val comment = MutableLiveData<FetchCommentResponse>()
    val activityResult = MutableLiveData<Boolean>()

    fun fetchComment(slug: String, id: String) {
        viewModelScope.launch {
            comment.value = ApiClient.get().fetchComment(slug, id)
        }
    }
    fun editPost() {
        viewModelScope.launch {
            ApiClient.get().updateComment(comment.value!!.slug, comment.value!!.id, UpdateCommentRequest(comment.value!!.body))
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