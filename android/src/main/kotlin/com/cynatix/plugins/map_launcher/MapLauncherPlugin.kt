package com.razorness.plugins.map_launcher

import android.content.Intent
import android.net.Uri
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.JSValue
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

private enum class MapType { google, googleGo, amap, baidu, waze, yandexNavi, yandexMaps, citymapper, osmand, osmandplus, doubleGis, tencent, here, petal, tomtomgo, copilot, sygicTruck, tomtomgofleet, flitsmeister, truckmeister, naver, kakao, tmap, mapyCz }

private class MapModel(val mapType: MapType, val mapName: String, val packageName: String, val urlPrefix: String) {
    fun toMap(): Map<String, String> {
        return mapOf("mapType" to mapType.name, "mapName" to mapName, "packageName" to packageName, "urlPrefix" to urlPrefix)
    }
}

@CapacitorPlugin(name = "CapacitorMapLauncher")
class MapLauncherPlugin : Plugin() {

    private val maps = listOf(
        MapModel(MapType.google, "Google Maps", "com.google.android.apps.maps", "geo://"),
        MapModel(MapType.googleGo, "Google Maps Go", "com.google.android.apps.mapslite", "geo://"),
        MapModel(MapType.amap, "Amap", "com.autonavi.minimap", "iosamap://"),
        MapModel(MapType.baidu, "Baidu Maps", "com.baidu.BaiduMap", "baidumap://"),
        MapModel(MapType.waze, "Waze", "com.waze", "waze://"),
        MapModel(MapType.yandexNavi, "Yandex Navigator", "ru.yandex.yandexnavi", "yandexnavi://"),
        MapModel(MapType.yandexMaps, "Yandex Maps", "ru.yandex.yandexmaps", "yandexmaps://"),
        MapModel(MapType.citymapper, "Citymapper", "com.citymapper.app.release", "citymapper://"),
        MapModel(MapType.osmand, "OsmAnd", "net.osmand", "osmandmaps://"),
        MapModel(MapType.osmandplus, "OsmAnd+", "net.osmand.plus", "osmandmaps://"),
        MapModel(MapType.doubleGis, "2GIS", "ru.dublgis.dgismobile", "dgis://"),
        MapModel(MapType.tencent, "Tencent (QQ Maps)", "com.tencent.map", "qqmap://"),
        MapModel(MapType.here, "HERE WeGo", "com.here.app.maps", "here-location://"),
        MapModel(MapType.petal, "Petal Maps", "com.huawei.maps.app", "petalmaps://"),
        MapModel(MapType.tomtomgo, "TomTom Go", "com.tomtom.gplay.navapp", "tomtomgo://"),
        MapModel(MapType.tomtomgofleet, "TomTom Go Fleet", "com.tomtom.gplay.navapp.gofleet", "tomtomgofleet://"),
        MapModel(MapType.sygicTruck, "Sygic Truck", "com.sygic.truck", "com.sygic.aura://"),
        MapModel(MapType.copilot, "CoPilot", "com.alk.copilot.mapviewer", "copilot://"),
        MapModel(MapType.flitsmeister, "Flitsmeister", "nl.flitsmeister", "flitsmeister://"),
        MapModel(MapType.truckmeister, "Truckmeister", "nl.flitsmeister.flux", "truckmeister://"),
        MapModel(MapType.naver, "Naver Map", "com.nhn.android.nmap", "nmap://"),
        MapModel(MapType.kakao, "Kakao Maps", "net.daum.android.map", "kakaomap://"),
        MapModel(MapType.tmap, "TMap", "com.skt.tmap.ku", "tmap://"),
        MapModel(MapType.mapyCz, "Mapy CZ", "cz.seznam.mapy", "https://")
    )

    private fun _getInstalledMaps(): List<MapModel> {
        return maps.filter { map ->
            context.packageManager?.getLaunchIntentForPackage(map.packageName) != null
        }
    }

    private fun _isMapAvailable(type: String): Boolean {
        return _getInstalledMaps().any { map -> map.mapType.name == type }
    }

    @PluginMethod
    fun getInstalledMaps(call: PluginCall) {
        val ret = JSObject()
        ret.put("value", JSArray(_getInstalledMaps().map { item -> JSObject.wrap(item.toMap()) }))
        call.resolve(ret)
    }

    @PluginMethod
    fun isMapAvailable(call: PluginCall) {
        val ret = JSObject()
        ret.put("value", _isMapAvailable(call.getString("mapType") as String))
        call.resolve(ret)
    }

    @PluginMethod
    fun showMarker(call: PluginCall) {
        val mapType = MapType.valueOf(call.getString("mapType") as String)
        val url = call.getString("url") as String

        if (!_isMapAvailable(call.getString("mapType") as String)) {
            call.errorCallback("Map is not installed on a device")
            return
        }

        context.let {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            val foundMap = maps.find { map -> map.mapType == mapType }
            if (foundMap != null) {
                intent.setPackage(foundMap.packageName)
            }
            it.startActivity(intent)
        }
        call.resolve()
    }

}
