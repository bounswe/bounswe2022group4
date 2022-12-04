package com.bounswe.heka.data.chat

data class SendMessageRequest(
    val receiver: String,
    val message: String,
)
