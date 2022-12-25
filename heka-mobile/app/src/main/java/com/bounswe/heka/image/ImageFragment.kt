package com.bounswe.heka.image

import android.graphics.Color
import android.graphics.Rect
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.bounswe.heka.databinding.FragmentImageBinding
import com.bumptech.glide.Glide
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ImageFragment: Fragment() {
    private lateinit var binding: FragmentImageBinding
    private val viewModel: ImageViewModel by viewModels()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentImageBinding.inflate(layoutInflater)
        binding.viewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        viewModel.image.value = arguments?.getString("image")
        viewModel.slug.value = arguments?.getString("slug")
        binding.annotatedImageView.setPostAnnotationListener {
            viewModel.width.value = binding.annotatedImageView.width
            viewModel.height.value = binding.annotatedImageView.height
            viewModel.addAnnotation(it)
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Glide.with(binding.root.context)
            .load(viewModel.image.value)
            .into(binding.imageView)
        viewModel.annotations.observe(viewLifecycleOwner) {
            binding.annotatedImageView.clearAnnotations()
            it.forEach { annotation ->
                annotation.json?.target?.selector?.value?.let { value ->
                    value.split("=")[1].split(",").let { (x, y, width, height) ->
                    binding.annotatedImageView.addAnnotation(
                        AnnotatedImageView.Annotation(
                            Rect(
                                (x.toDouble() * binding.imageView.width).toInt(),
                                (y.toDouble() * binding.imageView.height).toInt(),
                                ((x.toDouble() + width.toDouble()) * binding.imageView.width).toInt(),
                                ((y.toDouble() + height.toDouble()) * binding.imageView.height).toInt()
                            ),
                            Color.RED,
                        )
                    )
                        }
                }
            }
        }
    }
}