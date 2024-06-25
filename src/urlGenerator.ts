import { Capacitor } from '@capacitor/core';

import { MapType } from './definitions';

function encode(str: string | undefined, alt?: string | undefined): string | undefined {
	if (str) {
		return encodeURIComponent(str);
	}
	return alt ?? undefined;
}

export function generateMarkerUrl(mapType: MapType, coords: number[], title?: string, description?: string, zoom = 16): string {

	switch (mapType) {
		case MapType.GOOGLE:
			return buildUrl(
				Capacitor.getPlatform() === 'ios' ? 'comgooglemaps://' : 'geo:0,0',
				{
					'q'   : `${coords[ 1 ]},${coords[ 0 ]}${title ? `(${encode(title)})` : ''}`,
					'zoom': zoom.toString(),
				},
			);

		case MapType.GOOGLE_GO:
			return buildUrl(
				'http://maps.google.com/maps',
				{
					'q'   : `${coords[ 1 ]},${coords[ 0 ]}${title ? `(${encode(title)})` : ''}`,
					'zoom': zoom.toString(),
				},
			);

		case MapType.AMAP:
			return buildUrl(
				`${Capacitor.getPlatform() === 'ios' ? 'ios' : 'android'}amap://viewMap`,
				{
					'sourceApplication': 'map_launcher',
					'poiname'          : encode(title, ''),
					'lat'              : `${coords[ 1 ]}`,
					'lon'              : `${coords[ 0 ]}`,
					'zoom'             : zoom.toString(),
					'dev'              : '0',
				},
			);

		case MapType.BAIDU:
			return buildUrl(
				'baidumap://map/marker',
				{
					'location'  : `${coords[ 1 ]},${coords[ 0 ]}`,
					'title'     : encode(title, 'Title'),
					'content'   : encode(description, 'Description'), // baidu fails if no description provided
					'traffic'   : 'on',
					'src'       : 'com.map_launcher',
					'coord_type': 'gcj02',
					'zoom'      : zoom.toString(),
				},
			);

		case MapType.APPLE:
			return buildUrl(
				'http://maps.apple.com/maps',
				{
					'saddr': `${coords[ 1 ]},${coords[ 0 ]}`,
				},
			);

		case MapType.WAZE:
			return buildUrl(
				'waze://',
				{
					'll': `${coords[ 1 ]},${coords[ 0 ]}`,
					'z' : zoom.toString(),
				},
			);

		case MapType.YANDEX_NAVI:
			return buildUrl(
				'yandexnavi://show_point_on_map',
				{
					'lat'       : `${coords[ 1 ]}`,
					'lon'       : `${coords[ 0 ]}`,
					'zoom'      : zoom.toString(),
					'no-balloon': '0',
					'desc'      : encode(title, ''),
				},
			);

		case MapType.YANDEX_MAPS:
			return buildUrl(
				'yandexmaps://maps.yandex.ru/',
				{
					'pt': `${coords[ 0 ]},${coords[ 1 ]}`,
					'z' : zoom.toString(),
					'l' : 'map',
				},
			);

		case MapType.CITYMAPPER:
			return buildUrl(
				'citymapper://directions',
				{
					'endcoord': `${coords[ 1 ]},${coords[ 0 ]}`,
					'endname' : encode(title, ''),
				},
			);

		case MapType.MAPSWITHME:
			return buildUrl(
				'mapsme://map',
				{
					'v' : '1',
					'll': `${coords[ 1 ]},${coords[ 0 ]}`,
					'n' : encode(title),
				},
			);

		case MapType.OSMAND:
		case MapType.OSMANDPLUS:
			if (Capacitor.getPlatform() === 'ios') {
				return buildUrl(
					'osmandmaps://',
					{
						'lat'  : `${coords[ 1 ]}`,
						'lon'  : `${coords[ 0 ]}`,
						'z'    : zoom.toString(),
						'title': encode(title),
					},
				);
			}
			return buildUrl(
				'http://osmand.net/go',
				{
					'lat': `${coords[ 1 ]}`,
					'lon': `${coords[ 0 ]}`,
					'z'  : zoom.toString(),
				},
			);

		case MapType.DOUBLE_GIS:
			if (Capacitor.getPlatform() === 'ios') {
				return `dgis://2gis.ru/geo/${coords[ 0 ]},${coords[ 1 ]}`;
			}

			// android app does not seem to support marker by coordinates
			// so falling back to directions
			return `dgis://2gis.ru/routeSearch/rsType/car/to/${coords[ 0 ]},${coords[ 1 ]}`;

		case MapType.TENCENT:
			return buildUrl(
				'qqmap://map/marker',
				{
					'marker': `coord:${coords[ 1 ]},${coords[ 0 ]}${title ? `;title:${encode(title)}` : ''}`,
				},
			);

		case MapType.HERE:
			return buildUrl(
				`https://share.here.com/l/${coords[ 1 ]},${coords[ 0 ]},${encode(title)}`,
				{
					'z': zoom.toString(),
				},
			);

		case MapType.PETAL:
			return buildUrl(
				'petalmaps://poidetail',
				{
					'marker': `${coords[ 1 ]},${coords[ 0 ]}`,
					'z'     : zoom.toString(),
				},
			);

		case MapType.TOMTOMGO:
			if (Capacitor.getPlatform() === 'ios') {
				// currently uses the navigate endpoint on iOS, even when just showing a marker
				return buildUrl(
					'tomtomgo://x-callback-url/navigate',
					{
						'destination': `${coords[ 1 ]},${coords[ 0 ]}`,
					},
				);
			}
			return buildUrl(
				`geo:${coords[ 1 ]},${coords[ 0 ]}`,
				{
					'q': `${coords[ 1 ]},${coords[ 0 ]}${title ? `(${encode(title)})` : ''}`,
				},
			);

		case MapType.COPILOT:
			// Documentation:
			// https://developer.trimblemaps.com/copilot-navigation/v10-19/feature-guide/advanced-features/url-launch/
			return buildUrl(
				'copilot://mydestination',
				{
					'type'  : 'LOCATION',
					'action': 'VIEW',
					'marker': `${coords[ 1 ]},${coords[ 0 ]}`,
					'name'  : encode(title, ''),
				},
			);

		case MapType.TOMTOMGOFLEET:
			return buildUrl(
				`geo:${coords[ 1 ]},${coords[ 0 ]}`,
				{
					'q': `${coords[ 1 ]},${coords[ 0 ]}${title ? `(${encode(title)})` : ''}`,
				},
			);

		case MapType.SYGIC_TRUCK:
			// Documentation:
			// https://www.sygic.com/developers/professional-navigation-sdk/introduction
			return `com.sygic.aura://coordinate|${coords[ 0 ]}|${coords[ 1 ]}|show`;

		case MapType.FLITSMEISTER:
			if (Capacitor.getPlatform() === 'ios') {
				return buildUrl(
					'flitsmeister://',
					{
						'geo': `${coords[ 1 ]},${coords[ 0 ]}`,
					},
				);
			}
			return buildUrl(
				`geo:${coords[ 1 ]},${coords[ 0 ]}`,
				{
					'q': `${coords[ 1 ]},${coords[ 0 ]}`,
				},
			);

		case MapType.TRUCKMEISTER:
			if (Capacitor.getPlatform() === 'ios') {
				return buildUrl(
					'truckmeister://',
					{
						'geo': `${coords[ 1 ]},${coords[ 0 ]}`,
					},
				);
			}
			return buildUrl(
				`geo:${coords[ 1 ]},${coords[ 0 ]}`,
				{
					'q': `${coords[ 1 ]},${coords[ 0 ]}`,
				},
			);

		case MapType.NAVER:
			return buildUrl(
				'nmap://place',
				{
					'lat' : `${coords[ 1 ]}`,
					'lng' : `${coords[ 0 ]}`,
					'zoom': zoom.toString(),
					'name': encode(title),
				},
			);

		case MapType.KAKAO:
			return buildUrl(
				'kakaomap://look',
				{
					'p': `${coords[ 1 ]},${coords[ 0 ]}`,
				},
			);

		case MapType.TMAP:
			return buildUrl(
				'tmap://viewmap',
				{
					'name': encode(title, ''),
					'x'   : `${coords[ 0 ]}`,
					'y'   : `${coords[ 1 ]}`,
				},
			);

		case MapType.MAPY_CZ:
			return buildUrl(
				'https://mapy.cz/zakladni',
				{
					'id'    : '${coords[ 0 ]},${coords[ 1 ]}',
					'z'     : zoom.toString(),
					'source': 'coor',
				},
			);
		default:
			return `geo:${coords[ 1 ]},${coords[ 0 ]}`;
	}

}

function buildUrl(url: string, query?: Record<string, string | null | undefined>): string {
	if (!query) {
		return url;
	}
	const qry: string[] = [];
	for (const key in query) {
		if (typeof query[ key ] === 'string') {
			qry.push(key + '=' + query[ key ]);
		}
	}

	return url + '?' + qry.join('&');
}
