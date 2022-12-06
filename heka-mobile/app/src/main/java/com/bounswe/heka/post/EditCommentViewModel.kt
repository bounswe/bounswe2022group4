package com.bounswe.heka.post

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.post.*
import com.bounswe.heka.network.ApiClient
import kotlinx.coroutines.launch
import javax.inject.Inject

class EditCommentViewModel @Inject constructor(): ViewModel() {
    val comment = MutableLiveData<FetchCommentsResponse>()
    val activityResult = MutableLiveData<Boolean>()
    val slug = MutableLiveData<String>()

    fun fetchComment(slug: String, id: String) {
        this.slug.value = slug
        viewModelScope.launch {
            comment.value = ApiClient.get().fetchComment(slug, id)
        }
    }
    fun editPost() {
        viewModelScope.launch {
            ApiClient.get().updateComment(slug.value!!, comment.value!!.id, UpdateCommentRequest(comment.value!!.body))
        }
        activityResult.value = true
    }
    fun deletePost() {
        viewModelScope.launch {
            ApiClient.get().deleteComment(slug.value!!, comment.value!!.id)
        }
        activityResult.value = true
    }

}