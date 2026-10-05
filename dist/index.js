import { Capacitor, registerPlugin } from "@capacitor/core";
//#region src/definitions.ts
let MapType = /* @__PURE__ */ function(MapType) {
	/** Apple Maps. Only available on iOS. */
	MapType["APPLE"] = "apple";
	/** Google Maps */
	MapType["GOOGLE"] = "google";
	/** Google Maps Go. Only available on Android. */
	MapType["GOOGLE_GO"] = "googleGo";
	/** Amap (Gaode Maps) */
	MapType["AMAP"] = "amap";
	/** Baidu Maps */
	MapType["BAIDU"] = "baidu";
	/** Waze */
	MapType["WAZE"] = "waze";
	/** Yandex Maps */
	MapType["YANDEX_MAPS"] = "yandexMaps";
	/** Yandex Navi */
	MapType["YANDEX_NAVI"] = "yandexNavi";
	/** Citymapper */
	MapType["CITYMAPPER"] = "citymapper";
	/** MAPS.ME */
	MapType["MAPSWITHME"] = "mapswithme";
	/** OsmAnd */
	MapType["OSMAND"] = "osmand";
	/** OsmAnd+. Only available on Android. */
	MapType["OSMANDPLUS"] = "osmandplus";
	/** 2GIS */
	MapType["DOUBLE_GIS"] = "doubleGis";
	/** Tencent (QQ Maps) */
	MapType["TENCENT"] = "tencent";
	/** HERE WeGo */
	MapType["HERE"] = "here";
	/** Petal Maps. Only available on Android. */
	MapType["PETAL"] = "petal";
	/** TomTom Go */
	MapType["TOMTOMGO"] = "tomtomgo";
	/** TomTom Go Fleet */
	MapType["TOMTOMGOFLEET"] = "tomtomgofleet";
	/** CoPilot */
	MapType["COPILOT"] = "copilot";
	/** Sygic Truck */
	MapType["SYGIC_TRUCK"] = "sygicTruck";
	/** Flitsmeister. Only available on Android. */
	MapType["FLITSMEISTER"] = "flitsmeister";
	/** Truckmeister. Only available on Android. */
	MapType["TRUCKMEISTER"] = "truckmeister";
	/** Naver Map */
	MapType["NAVER"] = "naver";
	/** KakaoMap */
	MapType["KAKAO"] = "kakao";
	/** TMAP */
	MapType["TMAP"] = "tmap";
	/** Mapy.cz */
	MapType["MAPY_CZ"] = "mapyCz";
	return MapType;
}({});
//#endregion
//#region src/urlGenerator.ts
function encode(str, alt) {
	if (str) return encodeURIComponent(str);
	return alt !== null && alt !== void 0 ? alt : void 0;
}
function generateMarkerUrl(mapType, coords, title, description, zoom = 16) {
	switch (mapType) {
		case "google": return buildUrl(Capacitor.getPlatform() === "ios" ? "comgooglemaps://" : "geo:0,0", {
			"q": `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ""}`,
			"zoom": zoom.toString()
		});
		case "googleGo": return buildUrl("https://maps.google.com/maps", {
			"q": `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ""}`,
			"zoom": zoom.toString()
		});
		case "amap": return buildUrl(`${Capacitor.getPlatform() === "ios" ? "ios" : "android"}amap://viewMap`, {
			"sourceApplication": "map_launcher",
			"poiname": encode(title, ""),
			"lat": `${coords[1]}`,
			"lon": `${coords[0]}`,
			"zoom": zoom.toString(),
			"dev": "0"
		});
		case "baidu": return buildUrl("baidumap://map/marker", {
			"location": `${coords[1]},${coords[0]}`,
			"title": encode(title, "Title"),
			"content": encode(description, "Description"),
			"traffic": "on",
			"src": "com.map_launcher",
			"coord_type": "gcj02",
			"zoom": zoom.toString()
		});
		case "apple": return buildUrl("https://maps.apple.com/", {
			"ll": `${coords[1]},${coords[0]}`,
			"q": encode(title, `${coords[1]},${coords[0]}`),
			"z": zoom.toString()
		});
		case "waze": return buildUrl("waze://", {
			"ll": `${coords[1]},${coords[0]}`,
			"z": zoom.toString()
		});
		case "yandexNavi": return buildUrl("yandexnavi://show_point_on_map", {
			"lat": `${coords[1]}`,
			"lon": `${coords[0]}`,
			"zoom": zoom.toString(),
			"no-balloon": "0",
			"desc": encode(title, "")
		});
		case "yandexMaps": return buildUrl("yandexmaps://maps.yandex.ru/", {
			"pt": `${coords[0]},${coords[1]}`,
			"z": zoom.toString(),
			"l": "map"
		});
		case "citymapper": return buildUrl("citymapper://directions", {
			"endcoord": `${coords[1]},${coords[0]}`,
			"endname": encode(title, "")
		});
		case "mapswithme": return buildUrl("mapsme://map", {
			"v": "1",
			"ll": `${coords[1]},${coords[0]}`,
			"n": encode(title)
		});
		case "osmand":
		case "osmandplus":
			if (Capacitor.getPlatform() === "ios") return buildUrl("osmandmaps://", {
				"lat": `${coords[1]}`,
				"lon": `${coords[0]}`,
				"z": zoom.toString(),
				"title": encode(title)
			});
			return buildUrl("https://osmand.net/go", {
				"lat": `${coords[1]}`,
				"lon": `${coords[0]}`,
				"z": zoom.toString()
			});
		case "doubleGis":
			if (Capacitor.getPlatform() === "ios") return `dgis://2gis.ru/geo/${coords[0]},${coords[1]}`;
			return `dgis://2gis.ru/routeSearch/rsType/car/to/${coords[0]},${coords[1]}`;
		case "tencent": return buildUrl("qqmap://map/marker", { "marker": `coord:${coords[1]},${coords[0]}${title ? `;title:${encode(title)}` : ""}` });
		case "here": return buildUrl(`https://share.here.com/l/${coords[1]},${coords[0]}${title ? `,${encode(title)}` : ""}`, { "z": zoom.toString() });
		case "petal": return buildUrl("petalmaps://poidetail", {
			"marker": `${coords[1]},${coords[0]}`,
			"z": zoom.toString()
		});
		case "tomtomgo":
			if (Capacitor.getPlatform() === "ios") return buildUrl("tomtomgo://x-callback-url/navigate", { "destination": `${coords[1]},${coords[0]}` });
			return buildUrl(`geo:${coords[1]},${coords[0]}`, { "q": `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ""}` });
		case "copilot": return buildUrl("copilot://mydestination", {
			"type": "LOCATION",
			"action": "VIEW",
			"marker": `${coords[1]},${coords[0]}`,
			"name": encode(title, "")
		});
		case "tomtomgofleet": return buildUrl(`geo:${coords[1]},${coords[0]}`, { "q": `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ""}` });
		case "sygicTruck": return `com.sygic.aura://coordinate|${coords[0]}|${coords[1]}|show`;
		case "flitsmeister":
			if (Capacitor.getPlatform() === "ios") return buildUrl("flitsmeister://", { "geo": `${coords[1]},${coords[0]}` });
			return buildUrl(`geo:${coords[1]},${coords[0]}`, { "q": `${coords[1]},${coords[0]}` });
		case "truckmeister":
			if (Capacitor.getPlatform() === "ios") return buildUrl("truckmeister://", { "geo": `${coords[1]},${coords[0]}` });
			return buildUrl(`geo:${coords[1]},${coords[0]}`, { "q": `${coords[1]},${coords[0]}` });
		case "naver": return buildUrl("nmap://place", {
			"lat": `${coords[1]}`,
			"lng": `${coords[0]}`,
			"zoom": zoom.toString(),
			"name": encode(title)
		});
		case "kakao": return buildUrl("kakaomap://look", { "p": `${coords[1]},${coords[0]}` });
		case "tmap": return buildUrl("tmap://viewmap", {
			"name": encode(title, ""),
			"x": `${coords[0]}`,
			"y": `${coords[1]}`
		});
		case "mapyCz": return buildUrl("https://mapy.cz/zakladni", {
			"id": `${coords[0]},${coords[1]}`,
			"z": zoom.toString(),
			"source": "coor"
		});
		default: return `geo:${coords[1]},${coords[0]}`;
	}
}
function buildUrl(url, query) {
	if (!query) return url;
	const qry = [];
	for (const key in query) if (typeof query[key] === "string") qry.push(key + "=" + query[key]);
	return url + "?" + qry.join("&");
}
//#endregion
//#region src/index.ts
const MapLauncher = registerPlugin("CapacitorMapLauncher");
/**
* Opens a marker at `coords` (`[longitude, latitude]`) in the given map app.
*
* Rejects with code `MAP_NOT_AVAILABLE` if the app is not installed.
*/
function showMarker(mapType, coords, title, description, zoom = 16) {
	return MapLauncher.showMarker({
		mapType,
		url: generateMarkerUrl(mapType, coords, title, description, zoom),
		lat: coords[1],
		lon: coords[0],
		title,
		description
	});
}
//#endregion
export { MapLauncher, MapType, showMarker };

//# sourceMappingURL=index.js.map