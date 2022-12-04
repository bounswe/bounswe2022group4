package com.bounswe.heka.data.post

data class FetchCommentsResponse (
    val body: String,
    val username: String,
    val is_expert: Boolean,
    val updated_at: String,
    val upvote: Int,
    val downvote: Int,
    val is_upvoted: Boolean,
    val is_downvoted: Boolean,
    val id: Int,
        )


