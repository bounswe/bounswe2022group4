package com.bounswe.heka.network

import android.content.Context
import android.content.SharedPreferences
import com.bounswe.heka.R

class SessionManager (context: Context) {
    private var prefs: SharedPreferences = context.getSharedPreferences(context.getString(R.string.app_name), Context.MODE_PRIVATE)

    companion object {
        const val USER_TOKEN = "user_token"
    }

    /**
     * Function to save auth token
     */
    fun saveAuthToken(token: String) {
        val editor = prefs.edit()
        editor.putString(USER_TOKEN, token)
        editor.apply()
    }

    fun saveUsername(username: String) {
        val editor = prefs.edit()
        editor.putString("username", username)
        editor.apply()
    }

    fun saveProfileImage(imageUrl: String) {
        val editor = prefs.edit()
        editor.putString("profile_image", imageUrl)
        editor.apply()
    }

    fun clearAuthToken() {
        val editor = prefs.edit()
        editor.remove(USER_TOKEN)
        editor.apply()
    }

    fun clearUsername() {
        val editor = prefs.edit()
        editor.remove("username")
        editor.apply()
    }

    /**
     * Function to fetch auth token
     */
    fun fetchAuthToken(): String? {
        return prefs.getString(USER_TOKEN, null)
    }

    fun fetchUsername(): String? {
        return prefs.getString("username", null)
    }

    fun fetchProfileImage(): String? {
        return prefs.getString("profile_image", null)
    }
}