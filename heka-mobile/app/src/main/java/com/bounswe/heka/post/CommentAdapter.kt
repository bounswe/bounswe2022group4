package com.bounswe.heka.post

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.MutableLiveData
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.bounswe.heka.R
import com.bounswe.heka.databinding.ListItemCommentBinding
import com.bounswe.heka.network.SessionManager

class CommentAdapter(private val data: MutableList<CommentListItemState>, val upvote: (String, Int) -> Unit, val downvote: (String, Int) -> Unit, val slug: MutableLiveData<String>): RecyclerView.Adapter<CommentAdapter.TimelineListItemViewHolder>()  {
    class TimelineListItemViewHolder(val binding: ListItemCommentBinding): RecyclerView.ViewHolder(binding.root){
        fun bind(state: CommentListItemState, upvote: (String, Int) -> Unit, downvote: (String, Int) -> Unit, slug: String){
            binding.state = state
            binding.commentItemUpvote.apply {
                isEnabled = !state.is_upvoted
                text = state.upvote.toString()
                setOnClickListener{
                    upvote(slug, state.id)
                }
            }
binding.commentItemDownvote.apply {
                isEnabled = !state.is_downvoted
                text = state.downvote.toString()
                setOnClickListener{
                    downvote(slug, state.id)
                }
            }
            binding.commentItemEdit.apply {
                visibility = (state.username == SessionManager(binding.root.context).fetchUsername())?.let { if (it) android.view.View.VISIBLE else android.view.View.GONE }
                setOnClickListener {
                    val bundle = Bundle()
                    bundle.putString("slug", slug)
                    bundle.putInt("comment_id", state.id)
//                    binding.root.findNavController().navigate(R.id.action_fullPostFragment_to_editCommentFragment, bundle)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TimelineListItemViewHolder {
        val binding = ListItemCommentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return TimelineListItemViewHolder(binding)
    }

    override fun onBindViewHolder(holder: TimelineListItemViewHolder, position: Int) {
        holder.bind(data[position], upvote, downvote, slug.value!!)
    }

    fun setData(a: List<CommentListItemState>){
        data.clear()
        data.addAll(a)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return data.size
    }
}