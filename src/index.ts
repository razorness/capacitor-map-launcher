import { registerPlugin } from '@capacitor/core';

import type { MapLauncherPlugin, MapType } from './definitions';
import { generateMarkerUrl } from './urlGenerator';

const MapLauncher = registerPlugin<MapLauncherPlugin>('MapLauncher');

export * from './definitions';
export { MapLauncher };

export function showMarker(mapType: MapType, coords: number[], title?: string, description?: string, zoom = 16): Promise<void> {
	return MapLauncher.showMarker({
		mapType    : mapType,
		url        : generateMarkerUrl(mapType, coords, title, description, zoom),
		lat        : coords[ 1 ],
		lon        : coords[ 0 ],
		title      : title,
		description: description
	});
}
