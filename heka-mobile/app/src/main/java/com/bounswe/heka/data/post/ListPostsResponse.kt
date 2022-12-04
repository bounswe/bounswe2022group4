package com.bounswe.heka.data.post

data class ListPostsResponse(
    val posts: List<Post>,
)

data class Post (
    val title: String,
    val body: String,
    val slug: String,
        )
