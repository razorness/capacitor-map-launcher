private enum MapType: String {
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

    func type() -> String {
        return self.rawValue
    }
}

private class MapModel {
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
