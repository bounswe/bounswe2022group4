package com.bounswe.heka.profile


import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.renderscript.ScriptGroup.Binding
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.data.ProfileResponse
import com.bounswe.heka.databinding.FragmentProfileEditBinding
import com.bounswe.heka.network.SessionManager
import com.bumptech.glide.Glide
import com.github.dhaval2404.imagepicker.ImagePicker
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class EditProfileFragment:Fragment() {
    private lateinit var binding: FragmentProfileEditBinding
    private lateinit var sessionManager: SessionManager
    private val viewModel: EditProfileViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        sessionManager = SessionManager(requireContext())
        binding = FragmentProfileEditBinding.inflate(layoutInflater)
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
        if(arguments?.getString("username") != null){
            viewModel.oldUsername = arguments?.getString("username");
            viewModel.username.value = arguments?.getString("username")!!
            viewModel.email.value = arguments?.getString("email")!!
            viewModel.name.value =  arguments?.getString("name")!!
            viewModel.age.value = arguments?.getInt("age")?.toString()
            viewModel.profile_image.value = arguments?.getString("profile_image")
            viewModel.isExpert.value = arguments?.getBoolean("is_expert",false)

        }else{
            viewModel.fetchProfile(sessionManager.fetchUsername()!!)
        }
        Glide.with(this).load(viewModel.profile_image.value).placeholder(R.drawable.temp_profile_photo).into(binding.profileImageEdit)
        binding.profileImageEdit.setOnClickListener {
            pickImage()
        }

        viewModel.activityResult.observe(viewLifecycleOwner) {
            if (it) {
                it.let {
                    sessionManager.saveUsername(viewModel.username.value!!)
                    findNavController().popBackStack()
                }
            }
        }



    }
    private fun pickImage() {
        ImagePicker.with(this)
            .crop()	    			//Crop image(Optional), Check Customization for more option
            .compress(1024)			//Final image size will be less than 1 MB(Optional)
            .maxResultSize(1080, 1080)	//Final image resolution will be less than 1080 x 1080(Optional)
            .start()
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            //Image Uri will not be null for RESULT_OK
            val uri: Uri = data?.data!!

            val istream = requireContext().contentResolver.openInputStream(uri)
            val bitmap = BitmapFactory.decodeStream(istream)
            viewModel.setImage(bitmap)
            // Use Uri object instead of File to avoid storage permissions
            Glide.with(this).load(uri).into(binding.profileImageEdit)
        } else if (resultCode == ImagePicker.RESULT_ERROR) {
            Toast.makeText(requireContext(), ImagePicker.getError(data), Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(requireContext(), "Task Cancelled", Toast.LENGTH_SHORT).show()
        }
    }
}