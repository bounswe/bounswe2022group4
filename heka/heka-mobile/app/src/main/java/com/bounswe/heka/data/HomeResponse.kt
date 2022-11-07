package com.bounswe.heka.data

data class HomeResponse(
    val id: Int,
    val name: String,
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val followers: Int,
    val following: Int,
    val isFollowing: Boolean
)
