package com.bounswe.heka.timeline

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.databinding.TimelineItemBinding

class TimeLineAdapter(private val data: List<TimelineListItemState>): RecyclerView.Adapter<TimeLineAdapter.TimelineListItemViewHolder>() {

    class TimelineListItemViewHolder(val binding: TimelineItemBinding): RecyclerView.ViewHolder(binding.root){
        fun bind(state: TimelineListItemState){
            binding.state = state
            if (state.image == null) {
                binding.timelineImage.visibility = View.GONE
            } else {
                binding.timelineImage.visibility = View.VISIBLE
            }
            Glide.with(binding.root.context)
                .load(state.image)
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .into(binding.timelineImage)

            if(state.username != sessionManager.fetchUsername() && !sessionManager.fetchExpert()) {
                binding.timelineEditButton.visibility = android.view.View.GONE
            } else {
                binding.timelineEditButton.visibility = android.view.View.VISIBLE
            }

            binding.timelineEditButton.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("slug", state.slug)
                bundle.putBoolean("expert_attempt" , state.username != sessionManager.fetchUsername() && sessionManager.fetchExpert())
                binding.root.findNavController()
                    .navigate(R.id.action_homeFragment_to_editPostFragment, bundle)
            }
            binding.card.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("slug", state.slug)
                bundle.putString("author_image", state.author_image)
                binding.root.findNavController()
                    .navigate(R.id.action_homeFragment_to_fullPostFragment, bundle)
            }
            binding.timelineItemUpvote.text = state.upvote.toString()
            binding.timelineItemDownvote.text = state.downvote.toString()
            binding.timelineItemUpvote.setOnClickListener {
                upvote(state.slug)
            }
            binding.timelineItemDownvote.setOnClickListener {
                downvote(state.slug)
            }
            binding.timelineProfileImage.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("username", state.username)
                binding.root.findNavController()
                    .navigate(R.id.action_homeFragment_to_profileFragment, bundle)
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