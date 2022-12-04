package com.bounswe.heka.data.post

data class UpdatePostRequest(
    var title: String,
    var body: String,
    var category: String,
    var location: String? = null,
    var image: String? = null,
)
