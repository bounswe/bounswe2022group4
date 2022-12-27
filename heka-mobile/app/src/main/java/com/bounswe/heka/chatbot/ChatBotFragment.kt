package com.bounswe.heka.chatbot

import android.os.Bundle
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.chatbot.BotMessagesListAdapter
import com.bounswe.heka.chatbot.ChatBotViewModel
import com.bounswe.heka.data.chat.UserInfo
import com.bounswe.heka.databinding.FragmentChatBotBinding
import com.bounswe.heka.network.SessionManager
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ChatBotFragment: Fragment() {
    private val viewModel: ChatBotViewModel by viewModels()
    private lateinit var viewDataBinding: FragmentChatBotBinding
    private lateinit var listAdapter: BotMessagesListAdapter
    private lateinit var listAdapterObserver: RecyclerView.AdapterDataObserver

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewDataBinding =
            FragmentChatBotBinding.inflate(inflater, container, false)
        viewDataBinding.viewModel = viewModel
        viewDataBinding.lifecycleOwner = this.viewLifecycleOwner
        setHasOptionsMenu(true)
        viewModel.otherUser.value = UserInfo(
            "chatbot",
            "chatbot",
            "test",
            "test",
            true,
        )
        return viewDataBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupListAdapter()
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                findNavController().popBackStack()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }

    private fun setupListAdapter() {
        val sessionManager = SessionManager(requireContext())
        val viewModel = viewDataBinding.viewModel
        if (viewModel != null) {
            listAdapterObserver = (object : RecyclerView.AdapterDataObserver() {
                override fun onItemRangeInserted(positionStart: Int, itemCount: Int) {
                    viewDataBinding.messagesRecyclerView.scrollToPosition(positionStart)
                }
            })
            listAdapter =
                BotMessagesListAdapter(viewModel, sessionManager.fetchUsername()!!)
            listAdapter.registerAdapterDataObserver(listAdapterObserver)
            viewDataBinding.messagesRecyclerView.adapter = listAdapter
            viewModel.initMessages()
        } else {
            throw Exception("")
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        listAdapter.unregisterAdapterDataObserver(listAdapterObserver)
    }
}