import { registerPlugin } from '@capacitor/core';

import type { Coordinates, MapLauncherPlugin, MapType } from './definitions';
import { generateMarkerUrl } from './urlGenerator';

const MapLauncher = registerPlugin<MapLauncherPlugin>('CapacitorMapLauncher');

export * from './definitions';
export { MapLauncher };

/**
 * Opens a marker at `coords` (`[longitude, latitude]`) in the given map app.
 *
 * Rejects with code `MAP_NOT_AVAILABLE` if the app is not installed.
 */
export function showMarker(mapType: MapType, coords: Coordinates, title?: string, description?: string, zoom = 16): Promise<void> {
  return MapLauncher.showMarker({
    mapType    : mapType,
    url        : generateMarkerUrl(mapType, coords, title, description, zoom),
    lat        : coords[ 1 ],
    lon        : coords[ 0 ],
    title      : title,
    description: description
  });
}
