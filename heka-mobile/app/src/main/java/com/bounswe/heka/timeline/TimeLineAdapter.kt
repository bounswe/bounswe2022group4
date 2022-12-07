package com.bounswe.heka.timeline

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.databinding.TimelineItemBinding

class TimeLineAdapter(private val data: List<TimelineListItemState>): RecyclerView.Adapter<TimeLineAdapter.TimelineListItemViewHolder>() {

    class TimelineListItemViewHolder(val binding: TimelineItemBinding): RecyclerView.ViewHolder(binding.root){
        fun bind(state: TimelineListItemState){
            binding.state = state
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TimelineListItemViewHolder {
        val binding = TimelineItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return TimelineListItemViewHolder(binding)
    }

    override fun onBindViewHolder(holder: TimelineListItemViewHolder, position: Int) {
        holder.bind(data[position])
    }

    override fun getItemCount(): Int {
        return data.size
    }
}