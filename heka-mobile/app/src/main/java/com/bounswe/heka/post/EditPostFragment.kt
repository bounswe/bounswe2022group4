package com.bounswe.heka.post

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentEditPostBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class EditPostFragment : Fragment() {
    private lateinit var binding: FragmentEditPostBinding
    private val viewModel: EditPostViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentEditPostBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        //viewModel.expertAttempt.value = arguments?.getBoolean("expert_attempt",false)!!

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.closeButton.setOnClickListener {
            findNavController().popBackStack()
        }
        viewModel.activityResult.observe(viewLifecycleOwner) {
            if (it) {
                findNavController().popBackStack()
            }
        }
        ArrayAdapter.createFromResource(
            requireContext(),
            R.array.category_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            binding.createPostTags.adapter = adapter
            binding.createPostTags.onItemSelectedListener =
                object : AdapterView.OnItemSelectedListener {
                    override fun onItemSelected(
                        parent: AdapterView<*>,
                        view: View,
                        pos: Int,
                        id: Long
                    ) {
                        viewModel.onTagSelected(parent.getItemAtPosition(pos).toString())
                    }

                    override fun onNothingSelected(parent: AdapterView<*>) {
                        // Another interface callback
                    }
                }
        }
        viewModel.fetchPost(arguments?.getString("slug", "")!!)
        //viewModel.expertAttempt.value = arguments?.getBoolean("expert_attempt",false)!!
        val expertAttempt = arguments?.getBoolean("expert_attempt", false)!!
        if (expertAttempt) {
            binding.deletePostButton.visibility = View.GONE
            binding.createPostContent.visibility = View.GONE
            binding.createPostTitle.visibility = View.GONE
            binding.createPostTags.visibility = View.VISIBLE
            viewModel.post.observe(viewLifecycleOwner) {
                it.let {
                    println(it.category)
                    resources.getStringArray(R.array.category_array)
                        .indexOfFirst { tt -> tt == it.category }.let { ci ->
                        if (ci != -1) {
                            binding.createPostTags.setSelection(ci,true)
                        }
                    }
                }
            }
        }
    }
}