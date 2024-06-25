// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MapLauncher",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "MapLauncher",
            targets: ["MapLauncherPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
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