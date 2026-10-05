package com.razorness.plugins.map_launcher

data class MapModel(val mapType: MapType, val mapName: String, val packageName: String, val urlPrefix: String) {
    fun toMap(): Map<String, String> {
        return mapOf("mapType" to mapType.name, "mapName" to mapName, "packageName" to packageName, "urlPrefix" to urlPrefix)
    }
}

/** Every package listed here also needs a `<queries>` entry in AndroidManifest.xml. */
internal val MAPS = listOf(
    MapModel(MapType.google, "Google Maps", "com.google.android.apps.maps", "geo://"),
    MapModel(MapType.googleGo, "Google Maps Go", "com.google.android.apps.mapslite", "geo://"),
    MapModel(MapType.amap, "Amap", "com.autonavi.minimap", "iosamap://"),
    MapModel(MapType.baidu, "Baidu Maps", "com.baidu.BaiduMap", "baidumap://"),
    MapModel(MapType.waze, "Waze", "com.waze", "waze://"),
    MapModel(MapType.yandexNavi, "Yandex Navigator", "ru.yandex.yandexnavi", "yandexnavi://"),
    MapModel(MapType.yandexMaps, "Yandex Maps", "ru.yandex.yandexmaps", "yandexmaps://"),
    MapModel(MapType.citymapper, "Citymapper", "com.citymapper.app.release", "citymapper://"),
    MapModel(MapType.mapswithme, "MAPS.ME", "com.mapswithme.maps.pro", "mapsme://"),
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
