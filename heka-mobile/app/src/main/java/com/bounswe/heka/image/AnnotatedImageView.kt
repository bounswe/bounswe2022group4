package com.bounswe.heka.image

import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.util.Log
import android.view.MotionEvent
import android.view.View

// A view that can be annotated with rectangles
class AnnotatedImageView(context: Context?, attrs: AttributeSet?) : View(context, attrs) {
    private val paint = Paint()
    private val path = Path()
    private val rect = RectF()
    private val annotations = mutableListOf<Annotation>()

    private var startX = 0f
    private var startY = 0f
    private var endX = 0f
    private var endY = 0f

    private var isDrawing = false

    private var tempRect = RectF()

    private lateinit var postAnnotationListener: (Rect) -> Unit



    // Add an annotation to the view
    fun addAnnotation(annotation: Annotation) {
        annotations.add(annotation)
        invalidate()
    }

    // Remove all annotations from the view
    fun clearAnnotations() {
        annotations.clear()
        invalidate()
    }

    fun setPostAnnotationListener(listener: (Rect) -> Unit) {
        postAnnotationListener = listener
    }

    // Draw the view
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        annotations.forEach { annotation ->
            paint.color = annotation.color
            paint.style = Paint.Style.STROKE
            paint.strokeWidth = 10f
            val newRect = RectF(annotation.rect)
            path.addRect(newRect, Path.Direction.CW)
            canvas.drawRect(newRect, paint)
        }
        if (isDrawing) {
            paint.color = Color.RED
            paint.style = Paint.Style.STROKE
            paint.strokeWidth = 10f
            tempRect.set(startX, startY, endX, endY)
            canvas.drawRect(tempRect, paint)
        }
    }


    override fun onTouchEvent(event: MotionEvent?): Boolean {
        when(event?.action) {
            MotionEvent.ACTION_DOWN -> {
                annotations.forEach { annotation ->
                    if (annotation.rect.contains(event.x.toInt(), event.y.toInt())) {
                        Log.d("AnnotatedImageView", "Annotation clicked")
                        return false
                    }
                }
                isDrawing = true
                startX = event.x
                startY = event.y
                return true
            }
            MotionEvent.ACTION_MOVE -> {
                endX = event.x
                endY = event.y
                invalidate()
            }
            MotionEvent.ACTION_UP -> {
                endX = event.x
                endY = event.y
                isDrawing = false
                var newRect = Rect(startX.toInt(), startY.toInt(), endX.toInt(), endY.toInt())
                postAnnotationListener(newRect)
                invalidate()
                return true
            }
        }
        return super.onTouchEvent(event)
    }

    // An annotation that can be drawn on the view
    data class Annotation(val rect: Rect, val color: Int)
}