package com.bounswe.heka.post

import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentFullPostBinding
import com.bounswe.heka.image.AnnotationDialogFragment
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
            bundle.putBoolean("expert_attempt" , SessionManager(requireContext()).fetchUsername() != viewModel.state.value?.username && SessionManager(requireContext()).fetchExpert())
            bundle.putString("slug", viewModel.slug.value)
            findNavController().navigate(R.id.action_fullPostFragment_to_editPostFragment, bundle)
        }
        // make timelineItemDescription selectable, and and init AlertDialog on selection


        // make timelineItemDescription textview highlighted and clickable by annotations
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
                            AnnotationDialogFragment.newInstance(annotation.json.body!!.value!!){

                            }
                            .show(childFragmentManager, "annotation")
                            Log.d("TAG", "onClick: ${annotation}")
                        }
                    }
                    spannableString.setSpan(clickableSpan, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
                }
                binding.timelineItemDescription.text = spannableString
                binding.timelineItemDescription.movementMethod = LinkMovementMethod.getInstance()
                // make timelineItemDescription selectable, and and init AlertDialog on selection
                binding.timelineItemDescription.setTextIsSelectable(true)
                binding.timelineItemDescription.customSelectionActionModeCallback = object : android.view.ActionMode.Callback {
                    override fun onPrepareActionMode(mode: android.view.ActionMode?, menu: android.view.Menu?): Boolean {
                        menu?.clear()
                        menu?.add("Add Annotation")?.setOnMenuItemClickListener {
                            val start = binding.timelineItemDescription.selectionStart
                            val end = binding.timelineItemDescription.selectionEnd
                            val selectedText = binding.timelineItemDescription.text.substring(start, end)
                            AnnotationDialogFragment.newInstance{
                                viewModel.addAnnotation(it, start, end)

                            }.show(childFragmentManager, "annotation")

                            true
                        }
                        return false
                    }

                    override fun onDestroyActionMode(mode: android.view.ActionMode?) {
                    }

                    override fun onCreateActionMode(mode: android.view.ActionMode?, menu: android.view.Menu?): Boolean {
                        val start: Int =  binding.timelineItemDescription.selectionStart
                        val end: Int =  binding.timelineItemDescription.selectionEnd
                        Log.d("FullPostFragment", "start: $start, end: $end")
                        return true
                    }

                    override fun onActionItemClicked(mode: android.view.ActionMode?, item: android.view.MenuItem?): Boolean {
                        return false
                    }
                }
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


            if (SessionManager(requireContext()).fetchUsername() != viewModel.state.value?.username && !SessionManager(requireContext()).fetchExpert()) {
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