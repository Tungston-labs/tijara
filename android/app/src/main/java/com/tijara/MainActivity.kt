package com.thijara

import android.os.Bundle // Import Bundle if it's not already there
import androidx.activity.enableEdgeToEdge // 👈 1. IMPORT THIS
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    // You MUST override onCreate() to call enableEdgeToEdge()
    override fun onCreate(savedInstanceState: Bundle?) {
        // 2. Call enableEdgeToEdge() BEFORE super.onCreate()
        enableEdgeToEdge() 
        
        super.onCreate(savedInstanceState)
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     */
    override fun getMainComponentName(): String = "tijara"

    /**
     * Returns the instance of the [ReactActivityDelegate].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}