package com.bounswe.heka.post

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.location.Location
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bounswe.heka.R
import com.bounswe.heka.databinding.FragmentCreatePostBinding
import com.bumptech.glide.Glide
import dagger.hilt.android.AndroidEntryPoint
import com.github.dhaval2404.imagepicker.ImagePicker
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

@AndroidEntryPoint
class CreatePostFragment:Fragment() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var binding: FragmentCreatePostBinding
    private val viewModel: CreatePostViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())
        binding = FragmentCreatePostBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        return binding.root
    }

    @SuppressLint("SetTextI18n")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.closeButton.setOnClickListener {
            findNavController().navigate(R.id.action_createPostFragment_to_homeFragment)
        }
        binding.createPostButton.setOnClickListener {
            viewModel.createPost()
            findNavController().navigate(R.id.action_createPostFragment_to_homeFragment)
        }
        ArrayAdapter.createFromResource(
            requireContext(),
            R.array.category_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            binding.createPostTags.adapter = adapter
            binding.createPostTags.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>, view: View, pos: Int, id: Long) {
                    viewModel.onTagSelected(parent.getItemAtPosition(pos).toString())
                }
                override fun onNothingSelected(parent: AdapterView<*>) {
                    // Another interface callback
                }
            }
        }
        binding.createPostImage.setOnClickListener {
            pickImage()
        }
        getLocation()
        viewModel.activityResult.observe(viewLifecycleOwner) {
            if (it) {
                findNavController().popBackStack()
            }
        }
    }

    private fun getLocation() {
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
                if (isGranted) {
                    getLocation()
                } else {
                    Toast.makeText(
                        requireContext(),
                        "Location permission is required to create a post",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }.launch(Manifest.permission.ACCESS_COARSE_LOCATION)
            return
        }
        fusedLocationClient.getCurrentLocation(100, null)
            .addOnSuccessListener { location : Location? ->
                location?.let {
                    val geocoder = android.location.Geocoder(requireContext(), java.util.Locale.getDefault())
                    val addresses = geocoder.getFromLocation(it.latitude, it.longitude, 1)
                    if (addresses.isNotEmpty()) {
                        binding.createPostLocation.text = addresses[0].getAddressLine(0)
                        viewModel.location.value = addresses[0].getAddressLine(0)
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
            Glide.with(this).load(uri).into(binding.createPostImagePreview)
            binding.createPostImage.text = "Change Image"
        } else if (resultCode == ImagePicker.RESULT_ERROR) {
            Toast.makeText(requireContext(), ImagePicker.getError(data), Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(requireContext(), "Task Cancelled", Toast.LENGTH_SHORT).show()
        }
    }

    companion object {
        private const val TAG = "CreatePostFragment"
        private var bundle: Bundle? = null
    }
}