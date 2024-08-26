<script lang="ts">
    import { onMount } from 'svelte';
    import type { LatLngBounds } from 'leaflet';
	import type { Desk } from '$lib/utils/desk';
    import plan from '$lib/plan.png';

    let map: L.Map;
	let desks: [
		{x: 0, y: 0, width: 1, height: 1},
	]

    onMount(async () => {
        const L = await import('leaflet'); // Dynamically import Leaflet
        const { CRS } = L;

        // Initialize the map with CRS.Simple
        map = L.map('map', {
            crs: CRS.Simple,
            minZoom: 3,
            maxZoom: 8,
            center: [0, 0],
            zoom: 5
        });

		console.log('map', map);

        const mapBounds: LatLngBounds = L.latLngBounds([[0, 0], [10, 20]]);

        // Add the image overlay
        L.imageOverlay(plan, mapBounds).addTo(map);

        // Set the view to the bounds
        map.fitBounds(mapBounds);

        // Define rectangle geographical bounds
        const bounds1: LatLngBounds = L.latLngBounds([[0, 0], [1, 1]]);
        const bounds2: LatLngBounds = L.latLngBounds([[1, 0], [2, 1.5]]);

        // Create rectangles
        L.rectangle(bounds1, { color: "#FF0000", weight: 1 }).addTo(map);
        L.rectangle(bounds2, { color: "#FF0000", weight: 1 }).addTo(map);
    });

</script>

<style>
  #map {
    width: 100%;
    height: 100%; /* Adjust the height as needed */
  }
</style>

<div id="map"></div>