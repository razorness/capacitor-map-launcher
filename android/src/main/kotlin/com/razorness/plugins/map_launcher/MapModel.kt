package com.razorness.plugins.map_launcher

class MapModel(val mapType: MapType, val mapName: String, val packageName: String, val urlPrefix: String) {
    fun toMap(): Map<String, String> {
        return mapOf("mapType" to mapType.name, "mapName" to mapName, "packageName" to packageName, "urlPrefix" to urlPrefix)
    }
}