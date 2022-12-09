package com.bounswe.heka.resetpassword

import com.bounswe.heka.forgotpassword.ForgetPasswordViewModel
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.ForgetPasswordBinding
import com.bounswe.heka.databinding.ResetPasswordBinding
import com.bounswe.heka.network.SessionManager
import dagger.hilt.android.AndroidEntryPoint



@AndroidEntryPoint
class ResetPasswordFragment: Fragment() {
    private lateinit var binding: ResetPasswordBinding
    private val viewModel: ResetPaswordViewModel by viewModels()
    lateinit var sessionManager: SessionManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = ResetPasswordBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        sessionManager = SessionManager(requireContext())
        binding.forgotButton.setOnClickListener {
            findNavController().popBackStack()
        }
        viewModel.toastMessage.observe(viewLifecycleOwner) {
            if (it != null) {
                Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
                viewModel.toastMessage.value = null
            }
        }

        viewModel.sentVerification.observe(viewLifecycleOwner) { resetState ->
            resetState.status.let{
                if (it == "Invalid User") {
                    viewModel.toastMessage.value = "Code or passwords are problematic"
                }else if (it == "password is updated") {
                    viewModel.toastMessage.value = "Password Changed"
                    findNavController().navigate(R.id.action_ResetPassword_to_homeFragment)

                }else{
                    viewModel.toastMessage.value = "Code is not correct"
                }


            }
        }
    }
}