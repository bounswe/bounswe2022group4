package com.bounswe.heka.chat

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.data.chat.ChatWithUserInfo
import com.bounswe.heka.databinding.ListItemChatBinding

class ChatsListAdapter internal constructor(private val viewModel: ChatListViewModel) :
    ListAdapter<(ChatWithUserInfo), ChatsListAdapter.ViewHolder>(ChatDiffCallback()) {

    class ViewHolder(private val binding: ListItemChatBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(viewModel: ChatListViewModel, item: ChatWithUserInfo) {
            binding.viewmodel = viewModel
            binding.chatwithuserinfo = item
            binding.executePendingBindings()
        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(viewModel, getItem(position))
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = ListItemChatBinding.inflate(layoutInflater, parent, false)
        return ViewHolder(binding)
    }
}

class ChatDiffCallback : DiffUtil.ItemCallback<ChatWithUserInfo>() {
    override fun areItemsTheSame(oldItem: ChatWithUserInfo, itemWithUserInfo: ChatWithUserInfo): Boolean {
        return oldItem == itemWithUserInfo
    }

    override fun areContentsTheSame(oldItem: ChatWithUserInfo, itemWithUserInfo: ChatWithUserInfo): Boolean {
        return oldItem.mChat.info.id == itemWithUserInfo.mChat.info.id
    }
}