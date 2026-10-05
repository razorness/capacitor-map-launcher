<template>
	<main>
		<h1>capacitor-map-launcher</h1>

		<p v-if="error" class="error">{{ error }}</p>

		<p v-if="!maps">Loading installed maps…</p>
		<p v-else-if="!maps.length">No supported map app installed.</p>

		<button v-for="map in maps" :key="map.mapType" class="map" @click="open(map)">
			<strong>{{ map.mapName }}</strong>
			<small>{{ map.mapType }} · {{ map.packageName ?? map.urlPrefix ?? 'built-in' }}</small>
		</button>
	</main>
</template>

<script setup lang="ts">
	import { MapLauncher, showMarker } from 'capacitor-map-launcher';
	import type { MapModel } from 'capacitor-map-launcher';
	import { onMounted, ref } from 'vue';

	// Brandenburg Gate, [lon, lat]
	const coords: [ number, number ] = [ 13.377348, 52.516323 ];

	const maps  = ref<MapModel[]>();
	const error = ref<string>();

	onMounted(async () => {
		try {
			maps.value = (await MapLauncher.getInstalledMaps()).value;
		} catch (e) {
			error.value = String(e);
		}
	});

	async function open(map: MapModel) {
		error.value = undefined;
		try {
			await showMarker(map.mapType, coords, 'Brandenburger Tor', 'Pariser Platz, Berlin');
		} catch (e) {
			const { code, message } = e as { code?: string; message?: string };
			error.value = `${code ?? 'ERROR'}: ${message ?? String(e)}`;
		}
	}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
	}

	.map {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
	}

	.error {
		color: #ff6b6b;
	}
</style>
