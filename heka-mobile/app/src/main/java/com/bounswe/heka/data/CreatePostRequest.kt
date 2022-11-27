package com.bounswe.heka.data

data class CreatePostRequest(
    val title: String?,
    val body: String?,
    val tags: String?,
    val location: String?,
    val imageUri: String?,
)
