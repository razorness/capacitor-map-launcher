import XCTest
@testable import MapLauncherPlugin

@MainActor
class MapLauncherTests: XCTestCase {
    let implementation = MapLauncher()

    func testEveryMapTypeHasExactlyOneModel() {
        for mapType in MapType.allCases {
            XCTAssertEqual(implementation.maps.filter { $0.mapType == mapType }.count, 1, "\(mapType)")
        }
    }

    func testGetMapByRawValue() {
        XCTAssertNil(implementation.getMap(type: "googleGo"), "Android only")
        XCTAssertNil(implementation.getMap(type: "unknown"))
        XCTAssertEqual(implementation.getMap(type: "mapyCz")?.mapType, .mapyCz)
        XCTAssertEqual(implementation.getMap(type: "yandexNavi")?.mapName, "Yandex Navigator")
    }

    func testToMapOmitsMissingUrlPrefix() {
        XCTAssertEqual(implementation.getMap(type: "apple")?.toMap(), ["mapName": "Apple Maps", "mapType": "apple"])
        XCTAssertEqual(implementation.getMap(type: "waze")?.toMap(), ["mapName": "Waze", "mapType": "waze", "urlPrefix": "waze://"])
    }

    func testParseUrlFallsBackToPercentEncoding() {
        XCTAssertEqual(implementation.parseUrl("waze://?ll=52.5,13.3&z=16")?.absoluteString, "waze://?ll=52.5,13.3&z=16")
        XCTAssertNotNil(implementation.parseUrl("com.sygic.aura://coordinate|13.3|52.5|show"))
    }
}
