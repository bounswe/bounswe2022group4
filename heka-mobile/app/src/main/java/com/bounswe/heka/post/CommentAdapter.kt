package com.bounswe.heka.post

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.databinding.ListItemCommentBinding

class CommentAdapter(private val data: List<CommentListItemState>): RecyclerView.Adapter<CommentAdapter.TimelineListItemViewHolder>()  {
    class TimelineListItemViewHolder(val binding: ListItemCommentBinding): RecyclerView.ViewHolder(binding.root){
        fun bind(state: CommentListItemState){
            binding.state = state
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TimelineListItemViewHolder {
        val binding = ListItemCommentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return TimelineListItemViewHolder(binding)
    }

    override fun onBindViewHolder(holder: TimelineListItemViewHolder, position: Int) {
        holder.bind(data[position])
    }

    override fun getItemCount(): Int {
        return data.size
    }
}