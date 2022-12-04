package com.bounswe.heka.data

data class CreatePostRequest(
    val title: String?,
    val body: String?,
    val category: String?,
    val location: String?,
    val image: String?,
)
