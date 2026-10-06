import UIKit

/// UIKit-backed methods (`isMapAvailable`, `getInstalledMaps`, `open`) are isolated to the main actor.
@MainActor
public final class MapLauncher {

    nonisolated let maps: [MapModel] = [
        MapModel(mapName: "Apple Maps", mapType: .apple, urlPrefix: nil),
        MapModel(mapName: "Google Maps", mapType: .google, urlPrefix: "comgooglemaps://"),
        MapModel(mapName: "Amap", mapType: .amap, urlPrefix: "iosamap://"),
        MapModel(mapName: "Baidu Maps", mapType: .baidu, urlPrefix: "baidumap://"),
        MapModel(mapName: "Waze", mapType: .waze, urlPrefix: "waze://"),
        MapModel(mapName: "Yandex Navigator", mapType: .yandexNavi, urlPrefix: "yandexnavi://"),
        MapModel(mapName: "Yandex Maps", mapType: .yandexMaps, urlPrefix: "yandexmaps://"),
        MapModel(mapName: "Citymapper", mapType: .citymapper, urlPrefix: "citymapper://"),
        MapModel(mapName: "MAPS.ME", mapType: .mapswithme, urlPrefix: "mapswithme://"),
        MapModel(mapName: "OsmAnd", mapType: .osmand, urlPrefix: "osmandmaps://"),
        MapModel(mapName: "2GIS", mapType: .doubleGis, urlPrefix: "dgis://"),
        MapModel(mapName: "Tencent (QQ Maps)", mapType: .tencent, urlPrefix: "qqmap://"),
        MapModel(mapName: "HERE WeGo", mapType: .here, urlPrefix: "here-location://"),
        MapModel(mapName: "TomTom Go", mapType: .tomtomgo, urlPrefix: "tomtomgo://"),
        MapModel(mapName: "TomTom Go Fleet", mapType: .tomtomgofleet, urlPrefix: "tomtomgofleet://"),
        MapModel(mapName: "Sygic Truck", mapType: .sygicTruck, urlPrefix: "com.sygic.aura://"),
        MapModel(mapName: "CoPilot", mapType: .copilot, urlPrefix: "copilot://"),
        MapModel(mapName: "Naver Map", mapType: .naver, urlPrefix: "nmap://"),
        MapModel(mapName: "Kakao Maps", mapType: .kakao, urlPrefix: "kakaomap://"),
        MapModel(mapName: "TMap", mapType: .tmap, urlPrefix: "tmap://"),
        MapModel(mapName: "Mapy CZ", mapType: .mapyCz, urlPrefix: "szn-mapy://")
    ]

    /// Nonisolated so the plugin can create it off the main actor; there is no mutable state.
    nonisolated init() {}

    /// Returns `nil` for unknown map types and for map types that are not supported on iOS.
    nonisolated func getMap(type: String) -> MapModel? {
        guard let mapType = MapType(rawValue: type) else {
            return nil
        }
        return maps.first { $0.mapType == mapType }
    }

    func isMapAvailable(_ map: MapModel) -> Bool {
        guard let urlPrefix = map.urlPrefix else {
            return true
        }
        guard let url = URL(string: urlPrefix) else {
            return false
        }
        return UIApplication.shared.canOpenURL(url)
    }

    func getInstalledMaps() -> [MapModel] {
        return maps.filter { isMapAvailable($0) }
    }

    /// Parses a URL built by the TypeScript layer. Before iOS 17, `URL(string:)` rejects characters
    /// like `|` (used by Sygic), so those are percent-encoded as a fallback.
    nonisolated func parseUrl(_ string: String) -> URL? {
        if let url = URL(string: string) {
            return url
        }
        return string.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed).flatMap { URL(string: $0) }
    }

    func open(url: URL) async -> Bool {
        return await UIApplication.shared.open(url)
    }

}
