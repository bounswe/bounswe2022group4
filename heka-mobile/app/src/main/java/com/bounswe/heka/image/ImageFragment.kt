package com.bounswe.heka.image

import android.graphics.Color
import android.graphics.Rect
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.bounswe.heka.databinding.FragmentImageBinding
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
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
        binding.annotatedImageView.setPostAnnotationListener { rect ->
            AnnotationDialogFragment.newInstance {
                viewModel.addAnnotation(rect, it)
            }.show(childFragmentManager, "annotation")
        }
        binding.annotatedImageView.setClickAnnotationListener { index ->
            viewModel.annotations.value?.get(index)?.json?.body?.value?.let {
                AnnotationDialogFragment.newInstance(it) {
                }.show(childFragmentManager, "annotation")
            }
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Glide.with(binding.root.context)
            .load(viewModel.image.value)
            .listener(object: RequestListener<Drawable> {
                override fun onLoadFailed(
                    e: GlideException?,
                    model: Any?,
                    target: Target<Drawable>?,
                    isFirstResource: Boolean
                ): Boolean {
                    return false
                }

                override fun onResourceReady(
                    resource: Drawable?,
                    model: Any?,
                    target: Target<Drawable>?,
                    dataSource: DataSource?,
                    isFirstResource: Boolean
                ): Boolean {
                    binding.annotatedImageView.layoutParams.height = (binding.annotatedImageView.width * resource!!.intrinsicHeight) / resource.intrinsicWidth
                    viewModel.width.value = binding.annotatedImageView.width
                    viewModel.height.value = binding.annotatedImageView.layoutParams.height
                    return false
                }
            })
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
                                (y.toDouble() * binding.annotatedImageView.layoutParams.height).toInt(),
                                ((x.toDouble() + width.toDouble()) * binding.imageView.width).toInt(),
                                ((y.toDouble() + height.toDouble()) * binding.annotatedImageView.layoutParams.height).toInt()
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