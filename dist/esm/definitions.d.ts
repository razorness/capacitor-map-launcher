export declare enum MapType {
    APPLE = "apple",
    GOOGLE = "google",
    GOOGLE_GO = "googleGo",
    AMAP = "amap",
    BAIDU = "baidu",
    WAZE = "waze",
    YANDEX_MAPS = "yandexMaps",
    YANDEX_NAVI = "yandexNavi",
    CITYMAPPER = "citymapper",
    MAPSWITHME = "mapswithme",
    OSMAND = "osmand",
    OSMANDPLUS = "osmandplus",
    DOUBLE_GIS = "doubleGis",
    TENCENT = "tencent",
    HERE = "here",
    PETAL = "petal",
    TOMTOMGO = "tomtomgo",
    TOMTOMGOFLEET = "tomtomgofleet",
    COPILOT = "copilot",
    SYGIC_TRUCK = "sygicTruck",
    FLITSMEISTER = "flitsmeister",
    TRUCKMEISTER = "truckmeister",
    NAVER = "naver",
    KAKAO = "kakao",
    TMAP = "tmap",
    MAPY_CZ = "mapyCz"
}
export interface MapModel {
    mapType: MapType;
    mapName: string;
    packageName: string;
    urlPrefix: string;
}
export interface MapLauncherPlugin {
    getInstalledMaps(): Promise<{
        value: MapModel[];
    }>;
    isMapAvailable(options: {
        mapType: MapType;
    }): Promise<{
        value: MapModel;
    }>;
    showMarker(options: {
        mapType: MapType;
        url: string;
        lat: number;
        lon: number;
        title?: string;
        description?: string;
    }): Promise<void>;
}
