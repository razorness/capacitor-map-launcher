import type { MapLauncherPlugin, MapType } from './definitions';
declare const MapLauncher: MapLauncherPlugin;
export * from './definitions';
export { MapLauncher };
export declare function showMarker(mapType: MapType, coords: number[], title?: string, description?: string, zoom?: number): Promise<void>;
