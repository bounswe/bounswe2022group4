package com.bounswe.heka.search

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.R
import com.bounswe.heka.data.SearchUserResponse
import com.bounswe.heka.databinding.ListItemPeopleSearchBinding
import com.bounswe.heka.databinding.ListItemSearchEmptyBinding
import com.bounswe.heka.databinding.ListItemSearchTitleBinding

class SearchResultAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val users = mutableListOf<SearchUserResponse>()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when(viewType) {
            0 -> {
                val binding = DataBindingUtil.inflate<ListItemSearchTitleBinding>(LayoutInflater.from(parent.context), R.layout.list_item_search_title, parent, false)
                TitleViewHolder(binding)
            }
            1 -> {
                val binding = DataBindingUtil.inflate<ListItemPeopleSearchBinding>(LayoutInflater.from(parent.context), R.layout.list_item_people_search, parent, false)
                UserViewHolder(binding)
            }
            else -> {
                val binding = DataBindingUtil.inflate<ListItemSearchEmptyBinding>(LayoutInflater.from(parent.context), R.layout.list_item_search_empty, parent, false)
                EmptyViewHolder(binding)
            }
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when(holder) {
            is TitleViewHolder -> {
//                holder.bind()
            }
            is UserViewHolder -> {
                holder.bind(users[position])
            }
            is EmptyViewHolder -> {
//                holder.bind()
            }
        }
    }

    override fun getItemCount(): Int = users.size

    override fun getItemViewType(position: Int): Int {
        return 1
    }
    fun addUser(it: SearchUserResponse) {
        users.add(it)
        notifyDataSetChanged()
    }

    fun clearUsers() {
        users.clear()
        notifyDataSetChanged()
    }

    inner class UserViewHolder(val binding: ListItemPeopleSearchBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(user: SearchUserResponse) {
            binding.user = user
        }
    }
    inner class TitleViewHolder(val binding: ListItemSearchTitleBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(user: SearchUserResponse) {
//            binding.user = user
        }
    }
    inner class EmptyViewHolder(val binding: ListItemSearchEmptyBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(user: SearchUserResponse) {
//            binding.user = user
        }
    }
}