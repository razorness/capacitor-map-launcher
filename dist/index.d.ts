//#region src/definitions.d.ts
export declare enum MapType {
  /** Apple Maps. Only available on iOS. */
  APPLE = "apple",
  /** Google Maps */
  GOOGLE = "google",
  /** Google Maps Go. Only available on Android. */
  GOOGLE_GO = "googleGo",
  /** Amap (Gaode Maps) */
  AMAP = "amap",
  /** Baidu Maps */
  BAIDU = "baidu",
  /** Waze */
  WAZE = "waze",
  /** Yandex Maps */
  YANDEX_MAPS = "yandexMaps",
  /** Yandex Navi */
  YANDEX_NAVI = "yandexNavi",
  /** Citymapper */
  CITYMAPPER = "citymapper",
  /** MAPS.ME */
  MAPSWITHME = "mapswithme",
  /** OsmAnd */
  OSMAND = "osmand",
  /** OsmAnd+. Only available on Android. */
  OSMANDPLUS = "osmandplus",
  /** 2GIS */
  DOUBLE_GIS = "doubleGis",
  /** Tencent (QQ Maps) */
  TENCENT = "tencent",
  /** HERE WeGo */
  HERE = "here",
  /** Petal Maps. Only available on Android. */
  PETAL = "petal",
  /** TomTom Go */
  TOMTOMGO = "tomtomgo",
  /** TomTom Go Fleet */
  TOMTOMGOFLEET = "tomtomgofleet",
  /** CoPilot */
  COPILOT = "copilot",
  /** Sygic Truck */
  SYGIC_TRUCK = "sygicTruck",
  /** Flitsmeister. Only available on Android. */
  FLITSMEISTER = "flitsmeister",
  /** Truckmeister. Only available on Android. */
  TRUCKMEISTER = "truckmeister",
  /** Naver Map */
  NAVER = "naver",
  /** KakaoMap */
  KAKAO = "kakao",
  /** TMAP */
  TMAP = "tmap",
  /** Mapy.cz */
  MAPY_CZ = "mapyCz"
}
/**
 * A position as `[longitude, latitude]` (GeoJSON order).
 */
export type Coordinates = [lon: number, lat: number];
export interface MapModel {
  mapType: MapType;
  /** Human-readable name, e.g. "Google Maps". */
  mapName: string;
  /** Android package name. Only set on Android. */
  packageName?: string;
  /** URL scheme used to detect the app, e.g. "waze://". */
  urlPrefix?: string;
}
export interface MapLauncherPlugin {
  /**
   * Lists the supported map apps that are installed on the device.
   *
   * On iOS, an app is only detected if its URL scheme is listed under
   * `LSApplicationQueriesSchemes` in the app's `Info.plist`.
   */
  getInstalledMaps(): Promise<{
    value: MapModel[];
  }>;
  /**
   * Checks whether the given map app is installed.
   */
  isMapAvailable(options: {
    mapType: MapType;
  }): Promise<{
    value: boolean;
  }>;
  /**
   * Opens a marker in the given map app.
   *
   * Prefer the exported `showMarker()` helper, which builds the app-specific `url` for you.
   * Rejects with code `MAP_NOT_AVAILABLE` if the app is not installed.
   */
  showMarker(options: {
    mapType: MapType;
    url: string;
    lat: number;
    lon: number;
    title?: string;
    description?: string;
  }): Promise<void>;
}
//#endregion
//#region src/index.d.ts
declare const MapLauncher: MapLauncherPlugin;
/**
 * Opens a marker at `coords` (`[longitude, latitude]`) in the given map app.
 *
 * Rejects with code `MAP_NOT_AVAILABLE` if the app is not installed.
 */
export declare function showMarker(mapType: MapType, coords: Coordinates, title?: string, description?: string, zoom?: number): Promise<void>;
//#endregion
export { MapLauncher };
//# sourceMappingURL=index.d.ts.map