package com.bounswe.heka.home

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(): ViewModel() {
    val adapter = TimeLineAdapter(mutableListOf(), this::upvotePost, this::downvotePost, this::getProfileImage)
    fun fetchTimeline() {
        viewModelScope.launch {
            try {
                ApiClient.get().listPosts().let {
                    adapter.addItems(it.map { post ->
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
                            )

                    }.toMutableList())
                }
            } catch (e: Exception) {
                Log.e("HomeViewModel", "Error fetching timeline", e)
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

        return try {
            ApiClient.get().getProfile(username).profile_image?:""
        } catch (e: Exception) {
            ""
        }
    }
}