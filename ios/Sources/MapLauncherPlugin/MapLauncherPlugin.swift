import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(MapLauncherPlugin)
public class MapLauncherPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MapLauncherPlugin"
    public let jsName = "CapacitorMapLauncher"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getInstalledMaps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showMarker", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isMapAvailable", returnType: CAPPluginReturnPromise),
    ]
    private let implementation = MapLauncher()

    @objc func getInstalledMaps(_ call: CAPPluginCall) {
    	call.resolve([
    		"value": implementation.getMapsAvailable()
    	])
    }

    @objc func showMarker(_ call: CAPPluginCall) {
		let mapType = call.getString("mapType") ?? ""
		let url = call.getString("url") ?? ""
        let title = call.getString("title") ?? ""
        let latitude = call.getDouble("lat") ?? 0
        let longitude = call.getDouble("lon") ?? 0

        let map = implementation.getMapByRawMapType(type: mapType)
        if (!implementation.isMapAvailable(map: map)) {
            call.reject("Map is not installed on a device", "MAP_NOT_AVAILABLE")
			return;
		}

        implementation.showMarker(mapType: MapType(rawValue: mapType)!, url: url, title: title, latitude: latitude, longitude: longitude)
    }

    @objc func isMapAvailable(_ call: CAPPluginCall) {
		let mapType = call.getString("mapType") ?? ""
		let map = implementation.getMapByRawMapType(type: mapType)
        call.resolve([
            "value": implementation.isMapAvailable(map: map)
        ])
    }
}
