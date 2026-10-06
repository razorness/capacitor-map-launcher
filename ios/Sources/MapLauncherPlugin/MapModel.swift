import Foundation

/// Raw values must match the `MapType` enum in `src/definitions.ts`.
public enum MapType: String, CaseIterable, Sendable {
    case apple
    case google
    case amap
    case baidu
    case waze
    case yandexNavi
    case yandexMaps
    case citymapper
    case mapswithme
    case osmand
    case doubleGis
    case tencent
    case here
    case tomtomgo
    case tomtomgofleet
    case copilot
    case sygicTruck
    case naver
    case kakao
    case tmap
    case mapyCz
}

public struct MapModel: Sendable {
    let mapName: String
    let mapType: MapType
    /// URL scheme used to detect the app; `nil` for apps that are always installed.
    let urlPrefix: String?

    func toMap() -> [String: String] {
        var map = [
            "mapName": mapName,
            "mapType": mapType.rawValue
        ]
        if let urlPrefix = urlPrefix {
            map["urlPrefix"] = urlPrefix
        }
        return map
    }
}
