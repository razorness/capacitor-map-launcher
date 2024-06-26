'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

exports.MapType = void 0;
(function (MapType) {
    /// Apple Maps
    /// Only available on iOS
    MapType["APPLE"] = "apple";
    /// Google Maps
    MapType["GOOGLE"] = "google";
    /// Google Maps Go
    /// Only available on Android
    MapType["GOOGLE_GO"] = "googleGo";
    /// Amap (Gaode Maps)
    MapType["AMAP"] = "amap";
    /// Baidu Maps
    MapType["BAIDU"] = "baidu";
    /// Waze
    MapType["WAZE"] = "waze";
    /// Yandex Maps
    MapType["YANDEX_MAPS"] = "yandexMaps";
    /// Yandex Navi
    MapType["YANDEX_NAVI"] = "yandexNavi";
    /// Citymapper
    MapType["CITYMAPPER"] = "citymapper";
    /// Maps.me
    MapType["MAPSWITHME"] = "mapswithme";
    /// OsmAnd
    MapType["OSMAND"] = "osmand";
    /// OsmAnd+
    /// Only available on Android
    MapType["OSMANDPLUS"] = "osmandplus";
    /// DoubleGis
    MapType["DOUBLE_GIS"] = "doubleGis";
    /// Tencent (QQ Maps)
    MapType["TENCENT"] = "tencent";
    /// HERE WeGo
    MapType["HERE"] = "here";
    /// Petal Maps
    /// Only available on Android
    MapType["PETAL"] = "petal";
    /// TomTom Go
    MapType["TOMTOMGO"] = "tomtomgo";
    /// TomTom Go Fleet
    MapType["TOMTOMGOFLEET"] = "tomtomgofleet";
    /// CoPilot
    MapType["COPILOT"] = "copilot";
    /// Sygic Truck
    MapType["SYGIC_TRUCK"] = "sygicTruck";
    /// Flitsmeister
    /// Only available on Android
    MapType["FLITSMEISTER"] = "flitsmeister";
    /// Truckmeister
    /// Only available on Android
    MapType["TRUCKMEISTER"] = "truckmeister";
    // Naver Map
    MapType["NAVER"] = "naver";
    // KakaoMap
    MapType["KAKAO"] = "kakao";
    // TMAP
    MapType["TMAP"] = "tmap";
    /// MapyCZ
    MapType["MAPY_CZ"] = "mapyCz";
})(exports.MapType || (exports.MapType = {}));

function encode(str, alt) {
    if (str) {
        return encodeURIComponent(str);
    }
    return alt !== null && alt !== void 0 ? alt : undefined;
}
function generateMarkerUrl(mapType, coords, title, description, zoom = 16) {
    switch (mapType) {
        case exports.MapType.GOOGLE:
            return buildUrl(core.Capacitor.getPlatform() === 'ios' ? 'comgooglemaps://' : 'geo:0,0', {
                'q': `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ''}`,
                'zoom': zoom.toString(),
            });
        case exports.MapType.GOOGLE_GO:
            return buildUrl('http://maps.google.com/maps', {
                'q': `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ''}`,
                'zoom': zoom.toString(),
            });
        case exports.MapType.AMAP:
            return buildUrl(`${core.Capacitor.getPlatform() === 'ios' ? 'ios' : 'android'}amap://viewMap`, {
                'sourceApplication': 'map_launcher',
                'poiname': encode(title, ''),
                'lat': `${coords[1]}`,
                'lon': `${coords[0]}`,
                'zoom': zoom.toString(),
                'dev': '0',
            });
        case exports.MapType.BAIDU:
            return buildUrl('baidumap://map/marker', {
                'location': `${coords[1]},${coords[0]}`,
                'title': encode(title, 'Title'),
                'content': encode(description, 'Description'),
                'traffic': 'on',
                'src': 'com.map_launcher',
                'coord_type': 'gcj02',
                'zoom': zoom.toString(),
            });
        case exports.MapType.APPLE:
            return buildUrl('http://maps.apple.com/maps', {
                'saddr': `${coords[1]},${coords[0]}`,
            });
        case exports.MapType.WAZE:
            return buildUrl('waze://', {
                'll': `${coords[1]},${coords[0]}`,
                'z': zoom.toString(),
            });
        case exports.MapType.YANDEX_NAVI:
            return buildUrl('yandexnavi://show_point_on_map', {
                'lat': `${coords[1]}`,
                'lon': `${coords[0]}`,
                'zoom': zoom.toString(),
                'no-balloon': '0',
                'desc': encode(title, ''),
            });
        case exports.MapType.YANDEX_MAPS:
            return buildUrl('yandexmaps://maps.yandex.ru/', {
                'pt': `${coords[0]},${coords[1]}`,
                'z': zoom.toString(),
                'l': 'map',
            });
        case exports.MapType.CITYMAPPER:
            return buildUrl('citymapper://directions', {
                'endcoord': `${coords[1]},${coords[0]}`,
                'endname': encode(title, ''),
            });
        case exports.MapType.MAPSWITHME:
            return buildUrl('mapsme://map', {
                'v': '1',
                'll': `${coords[1]},${coords[0]}`,
                'n': encode(title),
            });
        case exports.MapType.OSMAND:
        case exports.MapType.OSMANDPLUS:
            if (core.Capacitor.getPlatform() === 'ios') {
                return buildUrl('osmandmaps://', {
                    'lat': `${coords[1]}`,
                    'lon': `${coords[0]}`,
                    'z': zoom.toString(),
                    'title': encode(title),
                });
            }
            return buildUrl('http://osmand.net/go', {
                'lat': `${coords[1]}`,
                'lon': `${coords[0]}`,
                'z': zoom.toString(),
            });
        case exports.MapType.DOUBLE_GIS:
            if (core.Capacitor.getPlatform() === 'ios') {
                return `dgis://2gis.ru/geo/${coords[0]},${coords[1]}`;
            }
            // android app does not seem to support marker by coordinates
            // so falling back to directions
            return `dgis://2gis.ru/routeSearch/rsType/car/to/${coords[0]},${coords[1]}`;
        case exports.MapType.TENCENT:
            return buildUrl('qqmap://map/marker', {
                'marker': `coord:${coords[1]},${coords[0]}${title ? `;title:${encode(title)}` : ''}`,
            });
        case exports.MapType.HERE:
            return buildUrl(`https://share.here.com/l/${coords[1]},${coords[0]},${encode(title)}`, {
                'z': zoom.toString(),
            });
        case exports.MapType.PETAL:
            return buildUrl('petalmaps://poidetail', {
                'marker': `${coords[1]},${coords[0]}`,
                'z': zoom.toString(),
            });
        case exports.MapType.TOMTOMGO:
            if (core.Capacitor.getPlatform() === 'ios') {
                // currently uses the navigate endpoint on iOS, even when just showing a marker
                return buildUrl('tomtomgo://x-callback-url/navigate', {
                    'destination': `${coords[1]},${coords[0]}`,
                });
            }
            return buildUrl(`geo:${coords[1]},${coords[0]}`, {
                'q': `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ''}`,
            });
        case exports.MapType.COPILOT:
            // Documentation:
            // https://developer.trimblemaps.com/copilot-navigation/v10-19/feature-guide/advanced-features/url-launch/
            return buildUrl('copilot://mydestination', {
                'type': 'LOCATION',
                'action': 'VIEW',
                'marker': `${coords[1]},${coords[0]}`,
                'name': encode(title, ''),
            });
        case exports.MapType.TOMTOMGOFLEET:
            return buildUrl(`geo:${coords[1]},${coords[0]}`, {
                'q': `${coords[1]},${coords[0]}${title ? `(${encode(title)})` : ''}`,
            });
        case exports.MapType.SYGIC_TRUCK:
            // Documentation:
            // https://www.sygic.com/developers/professional-navigation-sdk/introduction
            return `com.sygic.aura://coordinate|${coords[0]}|${coords[1]}|show`;
        case exports.MapType.FLITSMEISTER:
            if (core.Capacitor.getPlatform() === 'ios') {
                return buildUrl('flitsmeister://', {
                    'geo': `${coords[1]},${coords[0]}`,
                });
            }
            return buildUrl(`geo:${coords[1]},${coords[0]}`, {
                'q': `${coords[1]},${coords[0]}`,
            });
        case exports.MapType.TRUCKMEISTER:
            if (core.Capacitor.getPlatform() === 'ios') {
                return buildUrl('truckmeister://', {
                    'geo': `${coords[1]},${coords[0]}`,
                });
            }
            return buildUrl(`geo:${coords[1]},${coords[0]}`, {
                'q': `${coords[1]},${coords[0]}`,
            });
        case exports.MapType.NAVER:
            return buildUrl('nmap://place', {
                'lat': `${coords[1]}`,
                'lng': `${coords[0]}`,
                'zoom': zoom.toString(),
                'name': encode(title),
            });
        case exports.MapType.KAKAO:
            return buildUrl('kakaomap://look', {
                'p': `${coords[1]},${coords[0]}`,
            });
        case exports.MapType.TMAP:
            return buildUrl('tmap://viewmap', {
                'name': encode(title, ''),
                'x': `${coords[0]}`,
                'y': `${coords[1]}`,
            });
        case exports.MapType.MAPY_CZ:
            return buildUrl('https://mapy.cz/zakladni', {
                'id': '${coords[ 0 ]},${coords[ 1 ]}',
                'z': zoom.toString(),
                'source': 'coor',
            });
        default:
            return `geo:${coords[1]},${coords[0]}`;
    }
}
function buildUrl(url, query) {
    if (!query) {
        return url;
    }
    const qry = [];
    for (const key in query) {
        if (typeof query[key] === 'string') {
            qry.push(key + '=' + query[key]);
        }
    }
    return url + '?' + qry.join('&');
}

const MapLauncher = core.registerPlugin('MapLauncher');
function showMarker(mapType, coords, title, description, zoom = 16) {
    return MapLauncher.showMarker({
        mapType: mapType,
        url: generateMarkerUrl(mapType, coords, title, description, zoom),
        lat: coords[1],
        lon: coords[0],
        title: title,
        description: description
    });
}

exports.MapLauncher = MapLauncher;
exports.showMarker = showMarker;
//# sourceMappingURL=plugin.cjs.js.map
