package com.bounswe.heka.post

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.bounswe.heka.timeline.TimeLineAdapter
import com.bounswe.heka.timeline.TimelineListItemState
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class FullPostViewModel @Inject constructor(): ViewModel() {

    val adapter = CommentAdapter((0..20).map { CommentListItemState(it.toLong()) })
    val state =  MutableLiveData<TimelineListItemState>(TimelineListItemState());
}
