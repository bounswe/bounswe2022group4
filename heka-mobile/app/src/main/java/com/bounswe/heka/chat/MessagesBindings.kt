package com.bounswe.heka.chat

import android.annotation.SuppressLint
import android.view.View
import android.widget.TextView
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.data.chat.ChatWithUserInfo
import com.bounswe.heka.data.chat.Message
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit

// based on https://github.com/dgewe/Chat-App-Android/tree/master/app/src/main/java/com/fredrikbogg/android_chat_app/ui/chats
@BindingAdapter("bind_messages_list")
fun bindMessagesList(listView: RecyclerView, items: List<Message>?) {
    items?.let {
        (listView.adapter as MessagesListAdapter).submitList(items)
        listView.scrollToPosition(items.size - 1)
    }
}


@BindingAdapter("bind_chats_list")
fun bindChatsList(listView: RecyclerView, items: List<ChatWithUserInfo>?) {
    items?.let { (listView.adapter as ChatsListAdapter).submitList(items) }
}
@BindingAdapter("bind_message_view", "bind_message_textView", "bind_message", "bind_myUserID")
fun View.bindMessageSeen(view: View, textView: TextView, message: Message, myUserID: String) {
    if (message.senderID != myUserID && !message.seen) {
        view.visibility = View.VISIBLE
    } else {
        view.visibility = View.INVISIBLE
    }
}

@BindingAdapter("bind_chat_message_text", "bind_chat_message_text_viewModel")
fun TextView.bindMessageYouToText(message: Message, viewModel: ChatListViewModel) {
    this.text = if (message.senderID == viewModel.myUserID) {
        "You: " + message.text
    } else {
        message.text
    }
}

@SuppressLint("SimpleDateFormat")
@BindingAdapter("bind_epochTimeMsToDate_with_days_ago")
fun TextView.bindEpochTimeMsToDateWithDaysAgo(epochTimeMs: Long) {
    val numOfDays = TimeUnit.MILLISECONDS.toDays(Date().time - epochTimeMs)
    this.text = when {
        numOfDays == 1.toLong() -> "Yesterday"
        numOfDays > 1.toLong() -> "$numOfDays days ago"
        else -> {
            val pattern =
                SimpleDateFormat().toLocalizedPattern().replace("\\W?[YyMd]+\\W?".toRegex(), " ")
            val formatter = SimpleDateFormat(pattern, Locale.getDefault())
            formatter.format(Date(epochTimeMs))
        }
    }
}
