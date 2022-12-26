package com.bounswe.heka.search

import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import kotlinx.coroutines.*

// This is a snippet from one of Halil Salih Orhan's private projects.
class SearchManager private constructor(val editText: EditText) {
    companion object {
        fun queryTextChanges(edittext: EditText) = SearchManager(edittext)
    }
    enum class SearchErrors {
        EMPTY, SKIP
    }
    private var text = ""
    private var debounceTime = 500L
    private var skip = 2
    private var onSuccessListener: ((String) -> Unit)? = null
    private var onTextChangedListener: ((String) -> Unit)? = null
    private var onErrorListener: ((SearchErrors) -> Unit)? = null
    private var searchJob: Job? = null
    private val watcher = object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
        }
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            s?.toString()?.let {
                onTextChangedListener?.invoke(it)
            }
        }
        override fun afterTextChanged(s: Editable?) {
            s?.toString()?.let {
                setNewText(it)
            }
        }
    }
    init {
        editText.addTextChangedListener(watcher)
    }
    fun text(text: String): SearchManager {
        this.text = text
        editText.setText(this.text)
        return this
    }
    fun debounce(debounceTime: Int): SearchManager {
        this.debounceTime = debounceTime.toLong()
        return this
    }
    fun skip(skip: Int): SearchManager {
        this.skip = skip
        return this
    }
    fun onTextChanged(onTextChangedListener: (String) -> Unit): SearchManager {
        this.onTextChangedListener = onTextChangedListener
        return this
    }
    fun onSuccess(onSuccessListener: (String) -> Unit): SearchManager {
        this.onSuccessListener = onSuccessListener
        return this
    }
    fun onError(onErrorListener: (SearchErrors) -> Unit): SearchManager {
        this.onErrorListener = onErrorListener
        return this
    }
    private fun setNewText(text: String) {
        if (this.text == text) {
            return
        }
        this.text = text
        cancelJob()
        setJob()
    }
    private fun setJob() {
        searchJob = CoroutineScope(Dispatchers.IO).launch {
            delay(debounceTime)
            when {
                text.isEmpty() -> {
                    onErrorListener?.invoke(SearchErrors.EMPTY)
                }
                text.hasSkip() -> {
                    onErrorListener?.invoke(SearchErrors.SKIP)
                }
                else -> {
                    onSuccessListener?.invoke(text)
                }
            }
        }
    }
    private fun String.hasSkip() = length < skip
    private fun cancelJob() {
        searchJob?.cancel()
        searchJob = null
    }
}