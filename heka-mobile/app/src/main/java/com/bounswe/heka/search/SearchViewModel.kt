package com.bounswe.heka.search

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.network.ApiClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SearchViewModel @Inject constructor() : ViewModel() {
    val adapter = SearchResultAdapter()

    fun searchUsers(query: String) {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().searchUser(query)
                Log.d("SearchViewModel", "search: $response")
                adapter.clearUsers()
                response.forEach {
                    if (it.error != null) return@forEach
                    adapter.addUser(it)
                }
            } catch (e: Exception) {

            }
        }
    }
    fun searchPosts(query: String) {
        viewModelScope.launch {
            try {
                val response = ApiClient.get().searchPost(query)
                Log.d("SearchViewModel", "search: $response")
                adapter.clearPosts()
                response.forEach {
                    if (it.error != null) return@forEach
                    adapter.addPost(it)
                }
            } catch (e: Exception) {

            }
        }
    }


    fun clearUsers() {
        viewModelScope.launch {
            adapter.clearUsers()
        }
    }
    fun clearPosts() {
        viewModelScope.launch {
            adapter.clearPosts()
        }
    }
}