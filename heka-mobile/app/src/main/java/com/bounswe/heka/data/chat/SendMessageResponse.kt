package com.bounswe.heka.data.chat

data class SendMessageResponse(
    val sender: String,
    val receiver: String,
    val message: String,
)
