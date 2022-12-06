package com.bounswe.heka.data.chat

import java.util.*

data class Message(
    var senderID: String = "",
    var text: String = "",
    var epochTimeMs: Long = Date().time,
    var seen: Boolean = false
)