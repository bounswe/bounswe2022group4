package com.bounswe.heka.chat

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.data.EventObserver
import com.bounswe.heka.data.chat.ChatWithUserInfo
import com.bounswe.heka.databinding.FragmentChatListBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ChatListFragment: Fragment() {
    private val viewModel: ChatListViewModel by viewModels()
    private lateinit var viewDataBinding: FragmentChatListBinding
    private lateinit var listAdapter: ChatsListAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        viewDataBinding =
            FragmentChatListBinding.inflate(inflater, container, false)
        viewDataBinding.viewModel = viewModel
        viewDataBinding.lifecycleOwner = this.viewLifecycleOwner
        return viewDataBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupListAdapter()
        setupObservers()
    }

    private fun setupListAdapter() {
        val viewModel = viewDataBinding.viewModel
        if (viewModel != null) {
            listAdapter = ChatsListAdapter(viewModel)
            viewDataBinding.chatsRecyclerView.adapter = listAdapter
        } else {
            throw Exception("The viewmodel is not initialized")
        }
    }

    private fun setupObservers() {
        viewModel.selectedChat.observe(viewLifecycleOwner,
            EventObserver { navigateToChat(it) })
    }

    private fun navigateToChat(chatWithUserInfo: ChatWithUserInfo) {
        val bundle = bundleOf(
            "username" to chatWithUserInfo.mUserInfo.displayName
        )
        findNavController().navigate(R.id.action_chatListFragment_to_chatFragment, bundle)
    }
}