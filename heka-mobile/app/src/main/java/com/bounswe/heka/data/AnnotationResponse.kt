package com.bounswe.heka.data

data class AnnotationResponse(
    val geometry: Geometry?,
    val data: Data?,
    val json: JsonData?
)

data class Data(
    val text: String,
    val id: Double,
    val source: String,
)
data class Geometry(
    val x: Double,
    val y: Double,
    val width: Double,
    val height: Double
)

data class AnnotationTarget(
    val selector: Selector
)

data class Selector(
    val value: String
)

data class JsonData(
    val target: AnnotationTarget?
)