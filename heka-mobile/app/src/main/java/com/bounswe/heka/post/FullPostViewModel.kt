package com.bounswe.heka.post

import android.text.Html
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.AnnotationResponse
import com.bounswe.heka.data.Data
import com.bounswe.heka.data.Position
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
    val adapter = CommentAdapter(mutableListOf(), this::upvoteComment, this::downvoteComment, slug, this::getProfileImage)
    val annotations = MutableLiveData<List<AnnotationResponse>>()


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

    fun getAnnotations() {
        try {
            viewModelScope.launch {
                val response = ApiClient.get().getTextAnnotations(slug.value!!)
                annotations.value = response
            }
        } catch (e: Exception) {
            e.printStackTrace()
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

    suspend fun getProfileImage(username: String): String {

        return ApiClient.get().getProfile(username).profile_image?:""
    }
    fun addAnnotation(it: String, start: Int, end: Int) {
        viewModelScope.launch {
            try {
                ApiClient.get().postTextAnnotation(slug.value!!, AnnotationResponse(
                    position = Position(start, end),
                    data = Data(
                        text =it,
                        source = slug.value!!,
                        id = .0
                    )
                )
                )
                getAnnotations()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
