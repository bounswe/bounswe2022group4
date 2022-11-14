package com.bounswe.heka.home

import androidx.lifecycle.ViewModel
import com.bounswe.heka.timeline.TimeLineAdapter
import com.bounswe.heka.timeline.TimelineListItemState
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(): ViewModel() {
    val adapter = TimeLineAdapter((0..20).map { TimelineListItemState() })
}