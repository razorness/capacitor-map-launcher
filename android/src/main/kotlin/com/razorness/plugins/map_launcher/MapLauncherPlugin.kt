package com.razorness.plugins.map_launcher

import android.content.ActivityNotFoundException
import android.content.Intent
import androidx.core.net.toUri
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "CapacitorMapLauncher")
class MapLauncherPlugin : Plugin() {

    private fun findMap(type: String?): MapModel? {
        val mapType = MapType.fromName(type) ?: return null
        return MAPS.find { it.mapType == mapType }
    }

    private fun isInstalled(map: MapModel): Boolean {
        return context.packageManager.getLaunchIntentForPackage(map.packageName) != null
    }

    @PluginMethod
    fun getInstalledMaps(call: PluginCall) {
        val ret = JSObject()
        ret.put("value", JSArray(MAPS.filter { isInstalled(it) }.map { JSObject.wrap(it.toMap()) }))
        call.resolve(ret)
    }

    @PluginMethod
    fun isMapAvailable(call: PluginCall) {
        val map = findMap(call.getString("mapType"))
        val ret = JSObject()
        ret.put("value", map != null && isInstalled(map))
        call.resolve(ret)
    }

    @PluginMethod
    fun showMarker(call: PluginCall) {
        val map = findMap(call.getString("mapType"))
        if (map == null) {
            call.reject("Map is not supported on Android", "MAP_NOT_AVAILABLE")
            return
        }
        if (!isInstalled(map)) {
            call.reject("Map is not installed on the device", "MAP_NOT_AVAILABLE")
            return
        }
        val url = call.getString("url")
        if (url.isNullOrEmpty()) {
            call.reject("Invalid or missing url", "INVALID_URL")
            return
        }

        val intent = Intent(Intent.ACTION_VIEW, url.toUri())
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent.setPackage(map.packageName)
        try {
            context.startActivity(intent)
            call.resolve()
        } catch (e: ActivityNotFoundException) {
            call.reject("Map app could not be opened", "OPEN_FAILED", e)
        }
    }

}
