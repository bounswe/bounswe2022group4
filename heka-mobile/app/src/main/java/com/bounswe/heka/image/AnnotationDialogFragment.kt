package com.bounswe.heka.image

import android.app.AlertDialog
import android.app.Dialog
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import androidx.fragment.app.DialogFragment

class AnnotationDialogFragment(val data:String, val onResponse: (String)->Unit): DialogFragment() {
    companion object {
        fun newInstance(data: String = "",onResponse: (String)->Unit): AnnotationDialogFragment {
            return AnnotationDialogFragment(data,onResponse)
        }
    }


    override fun onCreateDialog(savedInstanceState: Bundle?): AlertDialog {
        val editText = EditText(requireContext())
        editText.setText(data)
        if(data.isNotEmpty()){
            editText.isEnabled = false
        }
        return AlertDialog.Builder(requireContext())
            .setTitle("Annotation")
            .setView(editText)
            .setPositiveButton("ok") {
                    dialog, which ->
                val text = editText.text.toString()
                if(text.isNotEmpty()){
                    onResponse(text)
                }
            }
            .create()
    }

}