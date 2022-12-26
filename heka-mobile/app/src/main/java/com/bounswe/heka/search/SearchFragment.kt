package com.bounswe.heka.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.databinding.FragmentSearchBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class SearchFragment: Fragment() {
    private lateinit var binding: FragmentSearchBinding
    private val viewModel: SearchViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentSearchBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.adapter = viewModel.adapter
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        SearchManager.queryTextChanges(binding.etSearch)
            .skip(3)
            .debounce(300)
            .onSuccess {
                viewModel.searchUsers(it)
                viewModel.searchPosts(it)
            }
            .onError {
                viewModel.clearUsers()
                viewModel.clearPosts()
            }
            .onTextChanged {  }
        binding.ibCancel.setOnClickListener {
            findNavController().popBackStack()
        }
    }

}