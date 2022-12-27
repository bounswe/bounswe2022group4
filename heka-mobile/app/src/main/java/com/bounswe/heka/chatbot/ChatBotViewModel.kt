package com.bounswe.heka.chatbot

import androidx.lifecycle.*
import com.bounswe.heka.data.chat.FetchMessageRequest
import com.bounswe.heka.data.chat.Message
import com.bounswe.heka.data.chat.SendMessageRequest
import com.bounswe.heka.data.chat.UserInfo
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject
@HiltViewModel
class ChatBotViewModel @Inject constructor(): ViewModel() {
    val otherUser: MutableLiveData<UserInfo> = MutableLiveData()
    val messagesList = MutableLiveData<MutableList<Message>>()
    val newMessageText = MutableLiveData<String>()
    var job: Job? = null
    val msgs = mutableListOf<Message>()
    var int = 1
    private fun fetchMessages() {
        viewModelScope.launch {
            try {
                otherUser.value?.let {
                    messagesList.value = msgs
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
    fun sendMessage(msg:String) {
        viewModelScope.launch {
            msgs.add(Message("me",msg))
        }
    }

    fun botsendMessage(msg:String){
        viewModelScope.launch {
            msgs.add(Message("chatbot",msg))
        }
    }

    fun button1(){

    }
    fun button2(){

    }
    fun button3(){

    }

    fun processInput(){

    }
    override fun onCleared() {
        super.onCleared()
        job?.cancel()
    }
    fun initMessages() {
        job = viewModelScope.launch {
            while (true) {
                fetchMessages()
                delay(1000)
            }
        }
    }


}