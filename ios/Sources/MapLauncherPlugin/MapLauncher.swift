import Foundation
import MapKit

@objc public class MapLauncher: NSObject {

	let maps: [MapModel] = [
		MapModel(mapName: "Apple Maps", mapType: MapType.apple, urlPrefix: ""),
		MapModel(mapName: "Google Maps", mapType: MapType.google, urlPrefix: "comgooglemaps://"),
		MapModel(mapName: "Amap", mapType: MapType.amap, urlPrefix: "iosamap://"),
		MapModel(mapName: "Baidu Maps", mapType: MapType.baidu, urlPrefix: "baidumap://"),
		MapModel(mapName: "Waze", mapType: MapType.waze, urlPrefix: "waze://"),
		MapModel(mapName: "Yandex Navigator", mapType: MapType.yandexNavi, urlPrefix: "yandexnavi://"),
		MapModel(mapName: "Yandex Maps", mapType: MapType.yandexMaps, urlPrefix: "yandexmaps://"),
		MapModel(mapName: "Citymapper", mapType: MapType.citymapper, urlPrefix: "citymapper://"),
		MapModel(mapName: "MAPS.ME", mapType: MapType.mapswithme, urlPrefix: "mapswithme://"),
		MapModel(mapName: "OsmAnd", mapType: MapType.osmand, urlPrefix: "osmandmaps://"),
		MapModel(mapName: "2GIS", mapType: MapType.doubleGis, urlPrefix: "dgis://"),
		MapModel(mapName: "Tencent (QQ Maps)", mapType: MapType.tencent, urlPrefix: "qqmap://"),
		MapModel(mapName: "HERE WeGo", mapType: MapType.here, urlPrefix: "here-location://"),
		MapModel(mapName: "TomTom Go", mapType: MapType.tomtomgo, urlPrefix: "tomtomgo://"),
		MapModel(mapName: "TomTom Go Fleet", mapType: MapType.tomtomgofleet, urlPrefix: "tomtomgofleet://"),
		MapModel(mapName: "Sygic Truck", mapType: MapType.sygicTruck, urlPrefix: "com.sygic.aura://"),
		MapModel(mapName: "CoPilot", mapType: MapType.copilot, urlPrefix: "copilot://"),
		MapModel(mapName: "Naver Map", mapType: MapType.naver, urlPrefix: "nmap://"),
		MapModel(mapName: "Kakao Maps", mapType: MapType.kakao, urlPrefix: "kakaomap://"),
		MapModel(mapName: "TMap", mapType: MapType.tmap, urlPrefix: "tmap://"),
		MapModel(mapName: "Mapy CZ", mapType: MapType.mapyCz, urlPrefix: "szn-mapy://")
	]

	@objc public func getMapByRawMapType(type: String) -> MapModel? {
        return maps.first(where: { $0.mapType.type() == type })
    }

    @objc public func getMapItem(latitude: Double, longitude: Double, name: String?) -> MKMapItem {
        let coordinate = CLLocationCoordinate2DMake(latitude, longitude)
        let destinationPlacemark = MKPlacemark(coordinate: coordinate, addressDictionary: nil)

        let mapItem = MKMapItem(placemark: destinationPlacemark)
        mapItem.name = name
        return mapItem
    }

    @objc public func showMarker(mapType: MapType, url: String, title: String, latitude: Double, longitude: Double) {
        switch mapType {
        case MapType.apple:
            let coordinate = CLLocationCoordinate2DMake(latitude, longitude)
            let region = MKCoordinateRegion(center: coordinate, span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.02))
            let placemark = MKPlacemark(coordinate: coordinate, addressDictionary: nil)
            let mapItem = MKMapItem(placemark: placemark)
            let options = [
                MKLaunchOptionsMapCenterKey: NSValue(mkCoordinate: region.center),
                MKLaunchOptionsMapSpanKey: NSValue(mkCoordinateSpan: region.span)]
            mapItem.name = title as String
            mapItem.openInMaps(launchOptions: options)
        default:
            let uri = URL(string:url)
            UIApplication.shared.open(uri!, options: [:], completionHandler: nil)
        }
    }

    @objc public func getMapsAvailable() -> [[String:String]] {
    	return maps.filter({ isMapAvailable(map: $0) }).map({ $0.toMap() })
    }

    @objc public func isMapAvailable(map: MapModel?) -> Bool {
        // maptype is not available on iOS
        guard let map = map else {
            return false
        }
        if map.mapType == MapType.apple {
            return true
        }
        return UIApplication.shared.canOpenURL(URL(string:map.urlPrefix!)!)
    }

}
