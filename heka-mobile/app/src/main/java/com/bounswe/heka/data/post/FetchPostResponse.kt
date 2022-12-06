package com.bounswe.heka.data.post

data class FetchPostResponse(
    var category: String,
    var title: String,
    var body: String,
    val slug: String,
    val username: String,
    val is_expert: Boolean,
    val updated_at: String,
    val upvote: Int,
    val downvote: Int,
    val is_upvoted: Boolean,
    val is_downvoted: Boolean,
    var image: String? = null,
    var location: String? = null,
)