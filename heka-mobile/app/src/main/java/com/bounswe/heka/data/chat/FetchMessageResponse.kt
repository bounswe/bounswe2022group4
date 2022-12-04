package com.bounswe.heka.data.chat

data class FetchMessageResponse(
    val sender: String,
    val receiver: String,
    val message: String,
    val timestamp: String,
)
