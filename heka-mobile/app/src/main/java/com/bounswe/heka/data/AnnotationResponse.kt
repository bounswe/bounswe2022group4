package com.bounswe.heka.data

data class AnnotationResponse(
    val geometry: Geometry? =null,
    val data: Data? = null,
    val json: JsonData? = null,
    val position: Position? = null,
)

data class Position(
    val start: Int? = null,
    val end: Int? = null,
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
    val value: String? = null,
    val start: Int? = null,
    val end: Int? = null,
)

data class JsonData(
    val target: AnnotationTarget?,
    val body: AnnotationBody?
)

data class AnnotationBody(
    val type: String? = "TextualBody",
    val value: String? = "",
    val format: String? = "text/plain",
)