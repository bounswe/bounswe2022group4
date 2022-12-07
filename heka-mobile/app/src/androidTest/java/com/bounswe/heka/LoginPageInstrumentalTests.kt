package com.bounswe.heka

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.rules.activityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import org.junit.Test
import org.junit.runner.RunWith

import org.junit.Assert.*
import org.junit.Rule

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */

@RunWith(AndroidJUnit4::class)
@LargeTest
class ChangeTextBehaviorKtTest {

    /**
     * Use [ActivityScenarioRule] to create and launch the activity under test before each test,
     * and close it after each test. This is a replacement for
     * [androidx.test.rule.ActivityTestRule].
     */
    @get:Rule
    var activityScenarioRule = activityScenarioRule<MainActivity>()

    @Test
    fun changeText_mail() {

        // Type text and then press the button.
        onView(withId(R.id.emailEditText))
            .perform(typeText(STRING_TO_BE_TYPED), closeSoftKeyboard())
        // Check there is no password so button will be not enabled.
        onView(withId(R.id.submit_button)).check(matches(isNotEnabled()))
    }

    @Test
    fun changeText_mail_and_pass() {
        // Type text and then press the button.
        onView(withId(R.id.emailEditText))
            .perform(typeText(STRING_TO_BE_TYPED), closeSoftKeyboard())
        onView(withId(R.id.passwordEditText))
            .perform(typeText(STRING_AS_PASS), closeSoftKeyboard())
        // Check there is no password so button will be not enabled.
        onView(withId(R.id.submit_button)).check(matches(isEnabled()))
    }
    

    companion object {

        val STRING_TO_BE_TYPED = "erdiguntr@gmail.com"
        val STRING_AS_PASS = "somePass123!"
    }
}