package com.bounswe.heka.profile

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentHomeBinding
import com.bounswe.heka.databinding.FragmentProfileBinding
import com.bounswe.heka.home.HomeViewModel
import com.bounswe.heka.network.SessionManager
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ProfileFragment: Fragment() {
    private lateinit var binding: FragmentProfileBinding
    private val viewModel: ProfileViewModel by viewModels()

    private lateinit var sessionManager: SessionManager
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {


        sessionManager = SessionManager(requireContext())

        binding = FragmentProfileBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel.logout.observe(viewLifecycleOwner) {
            if (it) {
                sessionManager.clearAuthToken()
                sessionManager.clearUsername()
                findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
            }
        }



    }
}