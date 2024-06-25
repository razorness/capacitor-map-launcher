import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(MapLauncherPlugin)
public class MapLauncherPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MapLauncherPlugin"
    public let jsName = "MapLauncher"
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
		let mapType = call.getString("mapType")
		let url = call.getString("url")
		let title = call.getString("title")
		let latitude = call.getString("lat")
		let longitude = call.getString("lon")

		let map = getMapByRawMapType(type: mapType)
		if (!isMapAvailable(map: map)) {
			result(FlutterError(code: "MAP_NOT_AVAILABLE", message: "Map is not installed on a device", details: nil))
			return;
		}

		showMarker(mapType: MapType(rawValue: mapType)!, url: url, title: title, latitude: latitude, longitude: longitude)
    }

    @objc func isMapAvailable(_ call: CAPPluginCall) {
		let mapType = call.getString("mapType")
		let map = implementation.getMapByRawMapType(type: mapType)
        call.resolve([
            "value": implementation.isMapAvailable(map: map)
        ])
    }

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
