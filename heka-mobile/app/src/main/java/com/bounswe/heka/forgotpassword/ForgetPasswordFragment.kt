package com.bounswe.heka.forgotpassword

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
import com.bounswe.heka.network.SessionManager
import dagger.hilt.android.AndroidEntryPoint



@AndroidEntryPoint
class ForgetPasswordFragment: Fragment() {
    private lateinit var binding: ForgetPasswordBinding
    private val viewModel: ForgetPasswordViewModel by viewModels()
    lateinit var sessionManager: SessionManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = com.bounswe.heka.databinding.ForgetPasswordBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        sessionManager = SessionManager(requireContext())
        binding.rememberButton.setOnClickListener {
            findNavController().popBackStack()
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
        viewModel.sentVerification.observe(viewLifecycleOwner) { resetState ->
            resetState.status.let{
                if (it == "Invalid User") {
                    viewModel.toastMessage.value = "There is no user with ${viewModel.email.value}"
                }else if (it == "Email sent to your mail address") {
                    viewModel.toastMessage.value = "Verification mail sent to ${viewModel.email.value}"
                    findNavController().navigate(R.id.action_ForgetPassword_to_ResetPassword)

            }else{
                    viewModel.toastMessage.value = "Something wrong with ${viewModel.email.value}"
                }


            }
        }
    }
}