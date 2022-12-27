package com.bounswe.heka.chatbot

import android.annotation.SuppressLint
import android.view.View
import android.widget.TextView
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.chat.ChatListViewModel
import com.bounswe.heka.chat.ChatsListAdapter
import com.bounswe.heka.chat.MessagesListAdapter
import com.bounswe.heka.data.chat.ChatWithUserInfo
import com.bounswe.heka.data.chat.Message
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit

// based on https://github.com/dgewe/Chat-App-Android/tree/master/app/src/main/java/com/fredrikbogg/android_chat_app/ui/chats
@BindingAdapter("bind_messages_list")
fun bindMessagesList(listView: RecyclerView, items: List<Message>?) {
    items?.let {
        (listView.adapter as BotMessagesListAdapter).submitList(items)
        listView.scrollToPosition(items.size - 1)
    }
}
