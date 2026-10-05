package com.razorness.plugins.map_launcher

/** Constant names must match the `MapType` string values in `src/definitions.ts`. */
enum class MapType {
    google, googleGo, amap, baidu, waze, yandexNavi, yandexMaps, citymapper, mapswithme,
    osmand, osmandplus, doubleGis, tencent, here, petal, tomtomgo, copilot, sygicTruck, tomtomgofleet,
    flitsmeister, truckmeister, naver, kakao, tmap, mapyCz;

    companion object {
        fun fromName(name: String?): MapType? = entries.find { it.name == name }
    }
}
