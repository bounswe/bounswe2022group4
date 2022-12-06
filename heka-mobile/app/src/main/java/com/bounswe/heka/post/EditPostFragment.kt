package com.bounswe.heka.post

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentEditPostBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class EditPostFragment:Fragment() {
    private lateinit var binding: FragmentEditPostBinding
    private val viewModel: EditPostViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentEditPostBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
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
        viewModel.fetchPost(arguments?.getString("slug","")!!)

    }
}