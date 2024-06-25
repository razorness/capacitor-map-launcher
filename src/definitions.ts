export enum MapType {
	/// Apple Maps
	/// Only available on iOS
	APPLE         = 'apple',

	/// Google Maps
	GOOGLE        = 'google',

	/// Google Maps Go
	/// Only available on Android
	GOOGLE_GO     = 'googleGo',

	/// Amap (Gaode Maps)
	AMAP          = 'amap',

	/// Baidu Maps
	BAIDU         = 'baidu',

	/// Waze
	WAZE          = 'waze',

	/// Yandex Maps
	YANDEX_MAPS   = 'yandexMaps',

	/// Yandex Navi
	YANDEX_NAVI   = 'yandexNavi',

	/// Citymapper
	CITYMAPPER    = 'citymapper',

	/// Maps.me
	MAPSWITHME    = 'mapswithme',

	/// OsmAnd
	OSMAND        = 'osmand',

	/// OsmAnd+
	/// Only available on Android
	OSMANDPLUS    = 'osmandplus',

	/// DoubleGis
	DOUBLE_GIS    = 'doubleGis',

	/// Tencent (QQ Maps)
	TENCENT       = 'tencent',

	/// HERE WeGo
	HERE          = 'here',

	/// Petal Maps
	/// Only available on Android
	PETAL         = 'petal',

	/// TomTom Go
	TOMTOMGO      = 'tomtomgo',

	/// TomTom Go Fleet
	TOMTOMGOFLEET = 'tomtomgofleet',

	/// CoPilot
	COPILOT       = 'copilot',

	/// Sygic Truck
	SYGIC_TRUCK   = 'sygicTruck',

	/// Flitsmeister
	/// Only available on Android
	FLITSMEISTER  = 'flitsmeister',

	/// Truckmeister
	/// Only available on Android
	TRUCKMEISTER  = 'truckmeister',

	// Naver Map
	NAVER         = 'naver',

	// KakaoMap
	KAKAO         = 'kakao',

	// TMAP
	TMAP          = 'tmap',

	/// MapyCZ
	MAPY_CZ       = 'mapyCz',
}

export interface MapModel {
	mapType: MapType;
	mapName: string;
	packageName: string;
	urlPrefix: string;
}

export interface MapLauncherPlugin {
	getInstalledMaps(): Promise<{ value: MapModel[] }>;

	isMapAvailable(options: { mapType: MapType }): Promise<{ value: MapModel }>;

	showMarker(options: { mapType: MapType, url: string, lat: number, lon: number, title?: string, description?: string }): Promise<void>;
}
