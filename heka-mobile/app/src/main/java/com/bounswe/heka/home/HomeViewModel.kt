package com.bounswe.heka.home

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.post.ListPostsResponse
import com.bounswe.heka.network.ApiClient
import com.bounswe.heka.timeline.TimeLineAdapter
import com.bounswe.heka.timeline.TimelineListItemState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel

class HomeViewModel @Inject constructor(): ViewModel() {
    val adapter = TimeLineAdapter(mutableListOf(), this::upvotePost, this::downvotePost, this::getProfileImage)
    fun fetchTimeline() {
        viewModelScope.launch {
            try {
                ApiClient.get().listPosts().let {
                    adapter.addItems(it.map { post ->
                        ApiClient.get().getProfile(post.username).let { profile ->
                            TimelineListItemState(
                                post.category,
                                post.title,
                                post.body,
                                post.slug,
                                post.username,
                                post.is_expert,
                                post.updated_at,
                                post.upvote,
                                post.downvote,
                                post.is_upvoted,
                                post.is_downvoted,
                                post.image,
                                post.location,
                                profile.profile_image
                            )
                        }
                    }.toMutableList())
                }
            } catch (e: Exception) {

            }
        }
    }

    fun upvotePost(slug: String) {
        viewModelScope.launch {
            try {
                ApiClient.get().upvotePost(slug)
                fetchTimeline()

            } catch (e: Exception) {
                fetchTimeline()
            }
        }
    }

    fun downvotePost(slug: String) {
        viewModelScope.launch {
            try {
                ApiClient.get().downvotePost(slug)
                fetchTimeline()

            } catch (e: Exception) {
                fetchTimeline()
            }
        }
    }
    suspend fun getProfileImage(username: String): String {

        return ApiClient.get().getProfile(username).profile_image?:""
    }
}