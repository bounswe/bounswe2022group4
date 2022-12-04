package com.bounswe.heka.post

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.timeline.TimeLineAdapter
import com.bounswe.heka.timeline.TimelineListItemState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FullPostViewModel @Inject constructor(): ViewModel() {

    val state =  MutableLiveData<TimelineListItemState>();
    var slug = MutableLiveData<String>()
    val adapter = CommentAdapter(mutableListOf(), this::upvoteComment, this::downvoteComment, slug)




    fun fetchPost() {
        viewModelScope.launch {
            val response = ApiClient.get().fetchPost(slug.value!!)
            state.value = response.let { TimelineListItemState(
                it.category,
                it.title,
                it.body,
                it.slug,
                it.username,
                it.is_expert,
                it.updated_at,
                it.upvote,
                it.downvote,
                it.is_upvoted,
                it.is_downvoted,
                it.image,
                it.location
            ) }
        }
    }

    fun fetchComments() {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().fetchComments(slug.value!!)
                adapter.setData(response.map {
                    CommentListItemState(
                        it.body,
                        it.username,
                        it.is_expert,
                        it.updated_at,
                        it.upvote,
                        it.downvote,
                        it.is_upvoted,
                        it.is_downvoted,
                        it.id
                    )
                })
            } catch (e: Exception) {
                Log.d("err",e.toString())
            }
        }
    }

    fun upvote() {
        viewModelScope.launch {
            try {
                ApiClient.get().upvotePost(slug.value!!)
                fetchPost()
            }catch (e: Exception) {
                fetchPost()
            }

        }
    }

    fun downvote() {
        viewModelScope.launch {
            try {
                ApiClient.get().downvotePost(slug.value!!)
                fetchPost()
            } catch (e: Exception) {
               fetchPost()
            }
        }
    }

    fun upvoteComment(slug: String, commentId: Int) {
        viewModelScope.launch {
            try {
                ApiClient.get().upvoteComment(slug, commentId )
                fetchComments()
            }catch (e: Exception) {
                fetchComments()
            }

        }
    }

    fun downvoteComment(slug: String, commentId: Int) {
        viewModelScope.launch {
            try {
                ApiClient.get().downvoteComment(slug, commentId)
                fetchComments()
            } catch (e: Exception) {
               fetchComments()
            }
        }
    }

}
