package com.bounswe.heka.chat

import androidx.lifecycle.*
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.data.Event
import com.bounswe.heka.data.chat.*
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ChatListViewModel @Inject constructor(): ViewModel() {

    val myUserID = "5f9f1b9b9b9b9b1b9b9b9b9b"

    private val _selectedChat = MutableLiveData<Event<ChatWithUserInfo>>()
    var selectedChat: LiveData<Event<ChatWithUserInfo>> = _selectedChat
    val chatsList = MutableLiveData<MutableList<ChatWithUserInfo>>()
    val chatbotIndicator = MutableLiveData<Boolean>()
    var job: Job? = null

    init {
        initJob()
    }

    private fun initJob() {
        job = viewModelScope.launch {
            while (true) {
                fetchChats()
                delay(10000)
            }
        }
    }
    fun selectChatWithUserInfoPressed(chat: ChatWithUserInfo) {
        _selectedChat.value = Event(chat)
    }

    fun goChatbot(){
        chatbotIndicator.value = true
    }


    private fun fetchChats() {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().fetchUsers()
                chatsList.value = response.user_list.map {
                    ChatWithUserInfo(
                        Chat(
                            lastMessage = Message(
                                "message $it",
                                "",
                                0,
                                true,
                            ),
                            ChatInfo(
                                id = it.toString(),
                            )
                        ),
                        UserInfo(
                            "5f9f1b9b9b9b9b1b9b9b9b9b",
                            "$it",
                            "",
                            getProfileImage(it.toString()),
                            false,
                        )
                    )
                }.toMutableList()
            } catch (e: Exception) {
                println(e.message)
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        job?.cancel()
    }

    suspend fun getProfileImage(username: String): String {
        return ApiClient.get().getProfile(username).profile_image?:""
    }

}