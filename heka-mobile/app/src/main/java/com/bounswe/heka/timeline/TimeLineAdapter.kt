package com.bounswe.heka.timeline

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.R
import com.bounswe.heka.databinding.TimelineItemBinding
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy



class TimeLineAdapter(private val data: List<TimelineListItemState>): RecyclerView.Adapter<TimeLineAdapter.TimelineListItemViewHolder>() {

    class TimelineListItemViewHolder(val binding: TimelineItemBinding): RecyclerView.ViewHolder(binding.root){
        val image = binding.timelineProfileImage
        fun bind(state: TimelineListItemState){
            binding.state = state
            Glide.with(binding.root.context)
                .load(state.src)
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .into(image)
            binding.timelineEditButton.setOnClickListener {
                binding.root.findNavController().navigate(R.id.action_homeFragment_to_editPostFragment)
            }
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