package com.bounswe.heka.data.chat

data class Chat(
    var lastMessage: Message = Message(),
    var info: ChatInfo = ChatInfo()
)

data class ChatInfo(
    var id: String = ""
)