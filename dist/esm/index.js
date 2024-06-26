import { registerPlugin } from '@capacitor/core';
import { generateMarkerUrl } from './urlGenerator';
const MapLauncher = registerPlugin('CapacitorMapLauncher');
export * from './definitions';
export { MapLauncher };
export function showMarker(mapType, coords, title, description, zoom = 16) {
    return MapLauncher.showMarker({
        mapType: mapType,
        url: generateMarkerUrl(mapType, coords, title, description, zoom),
        lat: coords[1],
        lon: coords[0],
        title: title,
        description: description
    });
}
//# sourceMappingURL=index.js.map