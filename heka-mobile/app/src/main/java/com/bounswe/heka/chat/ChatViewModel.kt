package com.bounswe.heka.chat

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.bounswe.heka.data.chat.Message
import com.bounswe.heka.data.chat.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlin.random.Random

@HiltViewModel
class ChatViewModel @Inject constructor(): ViewModel() {
    private val _otherUser: MutableLiveData<UserInfo> = MutableLiveData()
    private val _addedMessage = MutableLiveData<Message>()
    val messagesList = MutableLiveData<MutableList<Message>>()
    val newMessageText = MutableLiveData<String>()
    val otherUser: LiveData<UserInfo> = _otherUser
    init {
        setupMockChat()
    }

    private fun setupMockChat() {
        messagesList.value = MutableList(10) {
            if(Random.nextInt() % 2 == 0) {
                Message( "message $it",
                    "sender $it",
                    it.toLong(),
                    true,)
            } else {
                Message( "5f9f1b9b9b9b9b1b9b9b9b9b",
                    "sender $it",
                    it.toLong(),
                    true,)
            }
        }
    }
}