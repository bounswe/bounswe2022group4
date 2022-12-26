package com.bounswe.heka.search

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.R
import com.bounswe.heka.data.SearchPostResponse
import com.bounswe.heka.data.SearchUserResponse
import com.bounswe.heka.databinding.ListItemPeopleSearchBinding
import com.bounswe.heka.databinding.ListItemPostSearchBinding
import com.bounswe.heka.databinding.ListItemSearchEmptyBinding
import com.bounswe.heka.databinding.ListItemSearchTitleBinding

class SearchResultAdapter(): RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val users = mutableListOf<SearchUserResponse>()
    private val posts = mutableListOf<SearchPostResponse>()

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
                val binding = DataBindingUtil.inflate<ListItemPostSearchBinding>(LayoutInflater.from(parent.context), R.layout.list_item_post_search, parent, false)
                PostViewHolder(binding)
            }
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when(holder) {
            is TitleViewHolder -> {
                holder.bind(if(position == 0) "Users" else "Posts")
            }
            is UserViewHolder -> {
                holder.bind(users[position-1])
            }
            is PostViewHolder -> {
                holder.bind(posts[position-2-users.size])
            }
        }
    }

    override fun getItemCount(): Int = 2 + users.size + posts.size

    override fun getItemViewType(position: Int): Int {
        return when(position) {
            0 -> 0
            in 1..users.size -> 1
            users.size + 1 -> 0
            else -> 2
        }
    }
    fun addUser(it: SearchUserResponse) {
        users.add(it)
        notifyDataSetChanged()
    }

    fun clearUsers() {
        users.clear()
        notifyDataSetChanged()
    }

    fun clearPosts() {
        posts.clear()
        notifyDataSetChanged()
    }

    fun addPost(it: SearchPostResponse) {
        posts.add(it)
        notifyDataSetChanged()
    }

    inner class UserViewHolder(val binding: ListItemPeopleSearchBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(user: SearchUserResponse) {
            binding.user = user
            binding.root.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("username", user.username)
                binding.root.findNavController().navigate(R.id.action_searchFragment_to_profileFragment, bundle)
            }
        }
    }
    inner class PostViewHolder(val binding: ListItemPostSearchBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(post: SearchPostResponse) {
            binding.post = post
            binding.root.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("slug", post.link!!.substringAfterLast("/"))
                binding.root.findNavController().navigate(R.id.action_searchFragment_to_fullPostFragment, bundle)
            }
        }
    }
    inner class TitleViewHolder(val binding: ListItemSearchTitleBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(title: String) {
             binding.title = title
            if(title == "Users") {
                if(users.size == 0) {
                    binding.root.visibility = View.GONE
                } else {
                    binding.root.visibility = View.VISIBLE
                }
            } else {
                if(posts.size == 0) {
                    binding.root.visibility = View.GONE
                } else {
                    binding.root.visibility = View.VISIBLE
                }
            }
        }
    }
}