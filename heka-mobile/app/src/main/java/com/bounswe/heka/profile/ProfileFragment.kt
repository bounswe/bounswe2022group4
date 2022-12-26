package com.bounswe.heka.profile


import android.os.Bundle
import android.view.*
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentProfileBinding
import com.bounswe.heka.network.SessionManager
import com.bumptech.glide.Glide
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class ProfileFragment : Fragment() {
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
        viewModel.username.value =
            arguments?.getString("username") ?: sessionManager.fetchUsername()
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel.logout.observe(viewLifecycleOwner) {
            if (it) {
                sessionManager.clearAuthToken()
                sessionManager.clearUsername()
                findNavController().navigate(com.bounswe.heka.R.id.action_profileFragment_to_loginFragment)
            }
        }
        viewModel.state.observe(viewLifecycleOwner) {
            binding.userNickname.text = "@" + it.username;
            binding.userName.text = it.name;
            binding.viewModel?.isExpert?.value = it.is_expert?:false
            Glide.with(this).load(it.profile_image)
                .placeholder(com.bounswe.heka.R.drawable.temp_profile_photo)
                .into(binding.profileImageView)
        }

//        val window: Window = requireActivity().window
//        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
//        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
//        window.statusBarColor = ContextCompat.getColor(requireActivity(), R.color.v_blue)

        arguments?.getString("username")?.let { usernamex ->
            binding.chatButton.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("username", usernamex)
                findNavController().navigate(
                    com.bounswe.heka.R.id.action_profileFragment_to_chatFragment,
                    bundle
                )
            }
            print(usernamex);

        }
        if (viewModel.username.value != sessionManager.fetchUsername()) {
            binding.chatButton.visibility = View.VISIBLE;
        } else {
            binding.editProfileButton.visibility = View.VISIBLE;
            binding.editProfileButton.setOnClickListener {
                val bundle = Bundle()
                bundle.putString("email", viewModel.state.value?.email ?: "")
                bundle.putString("username", viewModel.state.value?.username ?: "")
                bundle.putString("name", viewModel.state.value?.name ?: "")
                bundle.putInt("age", viewModel.state.value?.age ?: 0)
                bundle.putString("profile_image", viewModel.state.value?.profile_image ?: "")
                bundle.putBoolean("is_expert", viewModel.state.value?.is_expert ?: false)
                findNavController().navigate(
                    com.bounswe.heka.R.id.action_profileFragment_to_editProfileFragment,
                    bundle
                )
            }
        }
        viewModel.getProfile()
    }

    override fun onResume() {
        super.onResume()
        changeBarColor(R.color.v_blue)
    }


    fun changeBarColor(bar_color: Int) {
        val window: Window = requireActivity().window
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = ContextCompat.getColor(requireActivity(), bar_color)

    }

}