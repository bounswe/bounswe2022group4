package com.bounswe.heka.post

import android.os.Bundle
import android.text.Html
import android.text.SpannableString
import android.text.Spanned
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.util.Base64
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentFullPostBinding
import com.bounswe.heka.network.SessionManager
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


@AndroidEntryPoint
class FullPostFragment: Fragment() {
    private lateinit var binding: FragmentFullPostBinding
    private val viewModel: FullPostViewModel by viewModels()
    private var isCollapsed = false
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentFullPostBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.adapter = viewModel.adapter
        viewModel.slug.value = arguments?.getString("slug")
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.closeButton.setOnClickListener {
            activity?.onBackPressed()
        }
        binding.commentButton.setOnClickListener {
            val bundle = Bundle()
            bundle.putString("slug", viewModel.slug.value)
            findNavController().navigate(R.id.action_fullPostFragment_to_createCommentFragment, bundle)
        }
        binding.timelineEditButton.setOnClickListener {
            val bundle = Bundle()
            bundle.putString("slug", viewModel.slug.value)
            findNavController().navigate(R.id.action_fullPostFragment_to_editPostFragment, bundle)
        }
        // make timeLineItemDescription textview highlighted and clickable by annotations
        viewModel.annotations.observe(viewLifecycleOwner) { annotations ->
            val text = viewModel.state.value?.body
            if (text != null) {
                val spannedText = text
                val spannableString = SpannableString(spannedText)
                annotations.forEach { annotation ->
                    val start = annotation.json!!.target!!.selector.start!!
                    val end = annotation.json.target!!.selector.end!!
                    val clickableSpan = object : ClickableSpan() {
                        override fun onClick(widget: View) {
                            val bundle = Bundle()
//                            bundle.putString("slug", annotation.slug)
//                            findNavController().navigate(R.id.action_fullPostFragment_to_fullPostFragment, bundle)
                            Log.d("TAG", "onClick: ${annotation}")
                        }
                    }
                    spannableString.setSpan(clickableSpan, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
                }
                binding.timelineItemDescription.text = spannableString
                binding.timelineItemDescription.movementMethod = LinkMovementMethod.getInstance()
            }
        }
        viewModel.state.observe(viewLifecycleOwner) {
            CoroutineScope(Dispatchers.IO).launch {
                viewModel.state.value?.username?.let {
                    viewModel.getProfileImage(it).let {
                        CoroutineScope(Dispatchers.Main).launch {
                            Glide.with(binding.root.context)
                                .load(it).placeholder(R.drawable.temp_profile_photo).into(binding.timelineProfileImage)
                        }
                    }
                }
            }
            binding.timelineItemDescription.text = it.body
            viewModel.getAnnotations()
            binding.timelineItemUpvote.apply {
                isEnabled = !it.is_upvoted
                text = it.upvote.toString()
                setOnClickListener {
                    viewModel.upvote()
                }
            }
            binding.timelineItemDownvote.apply {
                isEnabled = !it.is_downvoted
                text = it.downvote.toString()
                setOnClickListener {
                    viewModel.downvote()
                }
            }


            if (SessionManager(requireContext()).fetchUsername() != viewModel.state.value?.username) {
                binding.timelineEditButton.visibility = View.GONE
            }
            if(viewModel.state.value!!.image == null) {
                binding.image.visibility = View.GONE
            } else {
                binding.image.visibility = View.VISIBLE
                Glide.with(binding.root.context)
                    .load(viewModel.state.value!!.image)
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .into(binding.image)
                binding.image.setOnClickListener {
                    val bundle = Bundle()
                    bundle.putString("image", viewModel.state.value!!.image)
                    bundle.putString("slug", viewModel.slug.value)
                    findNavController().navigate(R.id.action_fullPostFragment_to_imageFragment, bundle)
                }
            }
        }
        Glide.with(this).
        load(arguments?.getString("slug")).
        placeholder(R.drawable.temp_profile_photo).
        diskCacheStrategy(DiskCacheStrategy.ALL).
        into(binding.timelineProfileImage)
        viewModel.fetchComments()
        viewModel.fetchPost()

    }
}