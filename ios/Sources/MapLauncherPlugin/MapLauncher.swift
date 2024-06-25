import Foundation

@objc public class MapLauncher: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
