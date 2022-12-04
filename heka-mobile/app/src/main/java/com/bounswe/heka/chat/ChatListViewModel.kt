package com.bounswe.heka.chat

import androidx.lifecycle.*
import com.bounswe.heka.data.Event
import com.bounswe.heka.data.chat.*
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ChatListViewModel @Inject constructor(): ViewModel() {

    val myUserID = "5f9f1b9b9b9b9b1b9b9b9b9b"

    private val _selectedChat = MutableLiveData<Event<ChatWithUserInfo>>()
    var selectedChat: LiveData<Event<ChatWithUserInfo>> = _selectedChat
    val chatsList = MutableLiveData<MutableList<ChatWithUserInfo>>()

    init {
//        setupMockChat()
        fetchChats()
    }

    fun selectChatWithUserInfoPressed(chat: ChatWithUserInfo) {
        _selectedChat.value = Event(chat)
    }
    private fun setupMockChat() {
        chatsList.value = MutableList(20){
            ChatWithUserInfo(
                Chat(
                    lastMessage = Message(
                        "message $it",
                        "sender $it",
                        it.toLong(),
                        true,
                    ),
                    ChatInfo(
                        id = it.toString(),
                    )
                ),
                UserInfo(
                    "5f9f1b9b9b9b9b1b9b9b9b9b",
                    "sender $it",
                    "",
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                    true,
                )
            )
        }
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
                                "sender $it",
                                33,
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
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                            true,
                        )
                    )
                }.toMutableList()
            } catch (e: Exception) {
                println(e.message)
            }
        }
    }

}