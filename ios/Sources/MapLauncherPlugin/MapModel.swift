import Foundation

@objc public enum MapType: Int, RawRepresentable {
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
    
    public typealias RawValue = String
    
    public var rawValue: RawValue {
        switch self {
        case .apple:
            return "apple"
        case .google:
            return "google"
        case .amap:
            return "amap"
        case .baidu:
            return "baidu"
        case .waze:
            return "waze"
        case .yandexNavi:
            return "yandexNavi"
        case .yandexMaps:
            return "yandexMaps"
        case .citymapper:
            return "citymapper"
        case .mapswithme:
            return "mapswithme"
        case .osmand:
            return "osmand"
        case .doubleGis:
            return "doubleGis"
        case .tencent:
            return "tencent"
        case .here:
            return "here"
        case .tomtomgo:
            return "tomtomgo"
        case .tomtomgofleet:
            return "tomtomgofleet"
        case .copilot:
            return "copilot"
        case .sygicTruck:
            return "sygicTruck"
        case .naver:
            return "naver"
        case .kakao:
            return "kakao"
        case .tmap:
            return "tmap"
        case .mapyCz:
            return "mapyCz"
        }
    }
    
    public init?(rawValue: RawValue) {
        switch rawValue {
        case "apple":
            self = .apple
        case "google":
            self = .google
        case "amap":
            self = .amap
        case "baidu":
            self = .baidu
        case "waze":
            self = .waze
        case "yandexNavi":
            self = .yandexNavi
        case "yandexMaps":
            self = .yandexMaps
        case "citymapper":
            self = .citymapper
        case "mapswithme":
            self = .mapswithme
        case "osmand":
            self = .osmand
        case "doubleGis":
            self = .doubleGis
        case "tencent":
            self = .tencent
        case "here":
            self = .here
        case "tomtomgo":
            self = .tomtomgo
        case "tomtomgofleet":
            self = .tomtomgofleet
        case "copilot":
            self = .copilot
        case "sygicTruck":
            self = .sygicTruck
        case "naver":
            self = .naver
        case "kakao":
            self = .kakao
        case "tmap":
            self = .tmap
        case "mapyCz":
            self = .mapyCz
        default:
            return nil
        }
    }

    func type() -> String {
        return self.rawValue
    }
}

@objc public class MapModel: NSObject {
    let mapName: String
    let mapType: MapType
    let urlPrefix: String?


    init(mapName: String, mapType: MapType, urlPrefix: String?) {
        self.mapName = mapName
        self.mapType = mapType
        self.urlPrefix = urlPrefix
    }

    func toMap() -> [String:String] {
        return [
            "mapName": mapName,
            "mapType": mapType.type(),
        ]
    }
    
    
}
