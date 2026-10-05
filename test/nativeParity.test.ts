import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { MapType } from '../src/definitions';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const matchAll = (source: string, pattern: RegExp) => [...source.matchAll(pattern)].map((m) => m[1]).sort();

const definitions = read('src/definitions.ts');
const kotlinMapTypes = read('android/src/main/kotlin/com/razorness/plugins/map_launcher/MapType.kt');
const kotlinModels = read('android/src/main/kotlin/com/razorness/plugins/map_launcher/MapModel.kt');
const manifest = read('android/src/main/AndroidManifest.xml');
const swiftModels = read('ios/Sources/MapLauncherPlugin/MapModel.swift');
const swiftMaps = read('ios/Sources/MapLauncherPlugin/MapLauncher.swift');

/** Map type values whose JSDoc says "Only available on <platform>". */
function onlyOn(platform: 'iOS' | 'Android'): string[] {
	return matchAll(definitions, new RegExp(`Only available on ${platform}\\. \\*/\\s+\\w+\\s*=\\s*'(\\w+)'`, 'g'));
}

const all = Object.values(MapType).sort();
const androidTypes = all.filter((type) => !onlyOn('iOS').includes(type));
const iosTypes = all.filter((type) => !onlyOn('Android').includes(type));

describe('native parity', () => {
	it('detects platform-only map types', () => {
		expect(onlyOn('iOS')).toEqual(['apple']);
		expect(onlyOn('Android').length).toBeGreaterThan(0);
	});

	it('Android MapType enum matches TypeScript', () => {
		const body = kotlinMapTypes.slice(kotlinMapTypes.indexOf('{') + 1, kotlinMapTypes.indexOf(';'));
		expect(body.split(',').map((name) => name.trim()).sort()).toEqual(androidTypes);
	});

	it('Android has one model per map type, each with a <queries> entry', () => {
		expect(matchAll(kotlinModels, /MapModel\(MapType\.(\w+),/g)).toEqual(androidTypes);
		const packages = matchAll(kotlinModels, /MapModel\(MapType\.\w+, "[^"]*", "([^"]+)"/g);
		const queries = matchAll(manifest, /<package android:name="([^"]+)"/g);
		expect(queries).toEqual(expect.arrayContaining(packages));
	});

	it('iOS MapType enum matches TypeScript', () => {
		expect(matchAll(swiftModels, /^\s+case (\w+)$/gm)).toEqual(iosTypes);
	});

	it('iOS has one model per map type', () => {
		expect(matchAll(swiftMaps, /mapType: \.(\w+),/g)).toEqual(iosTypes);
	});
});

describe('README', () => {
	it('lists every iOS URL scheme for LSApplicationQueriesSchemes', () => {
		const readme = read('README.md');
		const plist = readme.slice(readme.indexOf('<key>LSApplicationQueriesSchemes</key>'), readme.indexOf('</array>'));
		expect(matchAll(plist, /<string>([^<]+)<\/string>/g)).toEqual(matchAll(swiftMaps, /urlPrefix: "([^"]+):\/\/"/g));
	});
});

describe('example app', () => {
	it('declares every iOS URL scheme in Info.plist', () => {
		const plist = read('example/ios/App/App/Info.plist');
		const schemes = plist.slice(plist.indexOf('<key>LSApplicationQueriesSchemes</key>'));
		expect(matchAll(schemes.slice(0, schemes.indexOf('</array>')), /<string>([^<]+)<\/string>/g))
			.toEqual(matchAll(swiftMaps, /urlPrefix: "([^"]+):\/\/"/g));
	});
});
