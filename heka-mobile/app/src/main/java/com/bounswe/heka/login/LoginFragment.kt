package com.bounswe.heka.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentLoginBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlin.math.log

@AndroidEntryPoint
class LoginFragment: Fragment() {
    private lateinit var binding: FragmentLoginBinding
    private val viewModel: LoginViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentLoginBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val jwt = activity?.getSharedPreferences("com.bounswe.heka", 0)?.getString("jwt", null)
        if (jwt != null) {
            findNavController().navigate(R.id.action_loginFragment_to_homeFragment)
        }
        binding.textButton.setOnClickListener {
            findNavController().navigate(R.id.action_loginFragment_to_registerFragment)
        }
        binding.forgotButton.setOnClickListener{
            findNavController().navigate(R.id.action_loginFragment_to_forgetPassword)
        }
      viewModel.toastMessage.observe(viewLifecycleOwner) {
          if (it != null) {
              Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
              viewModel.toastMessage.value = null
          }
      }
        arguments?.getString("email")?.let {
            viewModel.email.value = it
        }
        viewModel.loginSuccessful.observe(viewLifecycleOwner) {
            if (it != null) {
                activity?.getSharedPreferences("com.bounswe.heka", 0 )?.edit()?.apply{
                    putString("jwt", it.jwt)
                }?.apply()

                findNavController().navigate(R.id.action_loginFragment_to_homeFragment)
                viewModel.loginSuccessful.value = null
            }
        }

    }
}