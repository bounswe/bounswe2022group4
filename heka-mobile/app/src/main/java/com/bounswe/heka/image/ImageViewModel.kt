package com.bounswe.heka.image

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ImageViewModel: ViewModel() {
    val image = MutableLiveData<String>()
}