import Foundation
@preconcurrency import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorMapLauncher)
public class CapacitorMapLauncher: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorMapLauncher"
    public let jsName = "CapacitorMapLauncher"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getInstalledMaps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showMarker", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isMapAvailable", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = MapLauncher()

    // Capacitor calls plugin methods on a background queue; UIApplication must be used on the main actor.
    // The tasks capture `implementation` rather than `self`, since only the former is Sendable.

    @objc func getInstalledMaps(_ call: CAPPluginCall) {
        let implementation = self.implementation
        Task { @MainActor in
            call.resolve([
                "value": implementation.getInstalledMaps().map { $0.toMap() }
            ])
        }
    }

    @objc func isMapAvailable(_ call: CAPPluginCall) {
        guard let map = implementation.getMap(type: call.getString("mapType") ?? "") else {
            call.resolve(["value": false])
            return
        }
        let implementation = self.implementation
        Task { @MainActor in
            call.resolve(["value": implementation.isMapAvailable(map)])
        }
    }

    @objc func showMarker(_ call: CAPPluginCall) {
        guard let map = implementation.getMap(type: call.getString("mapType") ?? "") else {
            call.reject("Map is not supported on iOS", "MAP_NOT_AVAILABLE")
            return
        }
        guard let url = implementation.parseUrl(call.getString("url") ?? "") else {
            call.reject("Invalid or missing url", "INVALID_URL")
            return
        }
        let implementation = self.implementation
        Task { @MainActor in
            guard implementation.isMapAvailable(map) else {
                call.reject("Map is not installed on the device", "MAP_NOT_AVAILABLE")
                return
            }
            if await implementation.open(url: url) {
                call.resolve()
            } else {
                call.reject("Map app could not be opened", "OPEN_FAILED")
            }
        }
    }

}
