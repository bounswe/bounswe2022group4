package com.bounswe.heka.image

import android.graphics.Color
import android.graphics.Rect
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.heka.data.AnnotationResponse
import com.bounswe.heka.data.Data
import com.bounswe.heka.data.Geometry
import com.bounswe.heka.network.ApiClient
import kotlinx.coroutines.launch

class ImageViewModel: ViewModel() {
    val slug = MutableLiveData<String>()
    val image = MutableLiveData<String>()
    val annotations = MutableLiveData<List<AnnotationResponse>>()
    val width = MutableLiveData<Int>()
    val height = MutableLiveData<Int>()

    init {
        slug.observeForever {
            try {
                viewModelScope.launch {
                    val response = ApiClient.get().getAnnotations(it)
                    annotations.value = response
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
            }
        }

    fun addAnnotation(it: Rect) {
        try {
            viewModelScope.launch {
                val response = ApiClient.get().postAnnotation(
                    slug.value!!,
                    AnnotationResponse(
                        Geometry(
                            it.left.toDouble() / width.value!!,
                            it.top.toDouble() / height.value!!,
                            it.width().toDouble() / width.value!!,
                            it.height().toDouble() / height.value!!
                        ),
                        Data(
                            "test",
                            0.0,
                            "test",
                        ),
                        null
                    )
                )
                annotations.value = ApiClient.get().getAnnotations(slug.value!!)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}