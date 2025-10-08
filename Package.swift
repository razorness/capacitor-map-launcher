// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorMapLauncher",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorMapLauncher",
            targets: ["MapLauncherPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "MapLauncherPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/MapLauncherPlugin"),
        .testTarget(
            name: "MapLauncherPluginTests",
            dependencies: ["MapLauncherPlugin"],
            path: "ios/Tests/MapLauncherPluginTests")
    ]
)