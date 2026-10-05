import { Capacitor } from '@capacitor/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MapType } from '../src/definitions';
import { generateMarkerUrl } from '../src/urlGenerator';

vi.mock('@capacitor/core', () => ({ Capacitor: { getPlatform: vi.fn() } }));

// Brandenburg Gate, [lon, lat]
const coords: [number, number] = [13.377348, 52.516323];

describe.each(['android', 'ios'])('generateMarkerUrl on %s', (platform) => {
	beforeEach(() => {
		vi.mocked(Capacitor.getPlatform).mockReturnValue(platform);
	});

	it.each(Object.values(MapType))('%s with title and description', (mapType) => {
		expect(generateMarkerUrl(mapType, coords, 'Bär & Tor', 'Some description', 15)).toMatchSnapshot();
	});

	it.each(Object.values(MapType))('%s without title and description', (mapType) => {
		expect(generateMarkerUrl(mapType, coords)).toMatchSnapshot();
	});
});
