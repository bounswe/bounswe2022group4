package com.bounswe.heka.timeline

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.bounswe.heka.databinding.FragmentTimelineBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class TimelineFragment: Fragment() {
    private lateinit var binding: FragmentTimelineBinding
    private val viewModel: TimelineViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentTimelineBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.adapter = TimeLineAdapter((0..20).map { TimelineListItemState() })
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

}