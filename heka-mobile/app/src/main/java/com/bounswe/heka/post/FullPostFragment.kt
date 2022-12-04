package com.bounswe.heka.post

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.bounswe.heka.databinding.FragmentFullPostBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FullPostFragment: Fragment() {
    private lateinit var binding: FragmentFullPostBinding
    private val viewModel: FullPostViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentFullPostBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.adapter = viewModel.adapter
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.closeButton.setOnClickListener {
            activity?.onBackPressed()
        }
    }
}