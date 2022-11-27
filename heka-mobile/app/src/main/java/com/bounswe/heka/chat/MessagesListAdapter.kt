package com.bounswe.heka.chat


import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.data.chat.Message
import com.bounswe.heka.databinding.ListItemMessageRecievedBinding
import com.bounswe.heka.databinding.ListItemMessageSentBinding


class MessagesListAdapter internal constructor(private val viewModel: ChatViewModel, private val userId: String) : ListAdapter<Message, RecyclerView.ViewHolder>(MessageDiffCallback()) {

    private val holderTypeMessageReceived = 1
    private val holderTypeMessageSent = 2

    class ReceivedViewHolder(private val binding: ListItemMessageRecievedBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(viewModel: ChatViewModel, item: Message) {
            binding.viewmodel = viewModel
            binding.message = item
            binding.executePendingBindings()
        }
    }

    class SentViewHolder(private val binding: ListItemMessageSentBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(viewModel: ChatViewModel, item: Message) {
            binding.viewmodel = viewModel
            binding.message = item
            binding.executePendingBindings()
        }
    }

    override fun getItemViewType(position: Int): Int {
        return if (getItem(position).senderID != userId) {
            holderTypeMessageReceived
        } else {
            holderTypeMessageSent
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder.itemViewType) {
            holderTypeMessageSent -> (holder as SentViewHolder).bind(
                viewModel,
                getItem(position)
            )
            holderTypeMessageReceived -> (holder as ReceivedViewHolder).bind(
                viewModel,
                getItem(position)
            )
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)

        return when (viewType) {
            holderTypeMessageSent -> {
                val binding = ListItemMessageSentBinding.inflate(layoutInflater, parent, false)
                SentViewHolder(binding)
            }
            holderTypeMessageReceived -> {
                val binding = ListItemMessageRecievedBinding.inflate(layoutInflater, parent, false)
                ReceivedViewHolder(binding)
            }
            else -> {
                throw Exception("Error reading holder type")
            }
        }
    }
}

class MessageDiffCallback : DiffUtil.ItemCallback<Message>() {
    override fun areItemsTheSame(oldItem: Message, newItem: Message): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: Message, newItem: Message): Boolean {
        return oldItem.epochTimeMs == newItem.epochTimeMs
    }
}