<template>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo"/>
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
		</a>
	</div>
	<!--	<hello-world msg="Vite + Vue"/>-->
	<div>
		ITEMS: {{ items?.value.length ?? 'n/a' }}<br/>
		<template v-if="items?.value">
			<div v-for="item in items!.value" :key="item.mapType" style="margin-top: 16px; border-top: 1px solid deeppink" @click="click(item)">
				<div>Type: {{ item.mapType }}</div>
				<div>Name: {{ item.mapName }}</div>
				<div>Package: {{ item.packageName }}</div>
				<div>URL Prefix: {{ item.urlPrefix }}</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import HelloWorld from './components/HelloWorld.vue';
	import { MapLauncher, MapModel, showMarker } from 'capacitor-map-launcher';

	export default defineComponent({
		components: { HelloWorld },
		setup() {

			const items = ref<{ value: MapModel[] }>();

			(async function () {
				items.value = await MapLauncher.getInstalledMaps();
				console.log(items.value);
			})();

			function click(item: MapModel) {
				console.log('clicked', item);
				showMarker(item.mapType, [ 13.377348, 52.516323 ], 'Bärtor', 'Beschreibung Cynatix');
			}

			return { items, click };
		}
	});
</script>


<style scoped>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
