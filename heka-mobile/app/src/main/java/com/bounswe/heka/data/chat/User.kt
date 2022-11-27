package com.bounswe.heka.data.chat

data class User(
    var info: UserInfo = UserInfo(),
    var friends: HashMap<String, UserFriend> = HashMap(),
    var notifications: HashMap<String, UserNotification> = HashMap(),
    var sentRequests: HashMap<String, UserRequest> = HashMap()
)

data class UserFriend(
    var userID: String = ""
)

data class UserInfo(
    var id: String = "",
    var displayName: String = "",
    var status: String = "No status",
    var profileImageUrl: String = "",
    var online: Boolean = false
)

data class UserNotification(
    var userID: String = ""
)

data class UserRequest(
    var userID: String = ""
)