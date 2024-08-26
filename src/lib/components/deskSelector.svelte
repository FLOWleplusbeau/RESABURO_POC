<script lang="ts">
  import { onMount } from "svelte";
  import type { LatLngBounds, rectangle } from "leaflet";
  import type { Desk } from "$lib/utils/desk";
  import plan from "$lib/plan.png";

  export let selectedDesk: Desk | null = null;

  let map: L.Map;

  let desks: Desk[] = [
    { x: 1, y: 1, width: 1, height: 1, rect: null },
    { x: 2, y: 2, width: 1, height: 1, rect: null },
    { x: 3, y: 3, width: 1, height: 1, rect: null },
    { x: 4, y: 4, width: 1, height: 1, rect: null },
    { x: 5, y: 5, width: 1, height: 1, rect: null },
  ];

  onMount(async () => {
    const L = await import("leaflet"); // Dynamically import Leaflet
    const { CRS } = L;

    const mapBounds: LatLngBounds = L.latLngBounds([
      [0, 0],
      [10, 20],
    ]);

    // Initialize the map with CRS.Simple
    map = L.map("map", {
      crs: CRS.Simple,
      minZoom: 3,
      maxZoom: 8,
      center: [0, 0],
      maxBounds: mapBounds,
      maxBoundsViscosity: 0.0,
      zoom: 5,
      attributionControl: false,
    });

    // Add the image overlay
    L.imageOverlay(plan, mapBounds).addTo(map);

    // Set the view to the bounds
    map.fitBounds(mapBounds);

    desks.forEach((desk) => {
      const bounds: LatLngBounds = L.latLngBounds([
        [desk.x, desk.y],
        [desk.x + desk.width, desk.y + desk.height],
      ]);
      desk.rect = L.rectangle(bounds, { color: "#FF0000", weight: 1 }).addTo(
        map
      );
      desk.rect.on("click", () => {
        handleDeskClick(desk);
      });
    });

    let lastDesk: Desk | null = null;

    function handleDeskClick(desk: Desk) {
      if (lastDesk)
        if (lastDesk.rect)
          lastDesk.rect.setStyle({ color: "#FF0000", weight: 1 });
      if (desk.rect) desk.rect.setStyle({ color: "#00FF00", weight: 2 });
      lastDesk = desk;
      selectedDesk = desk;
    }
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100%;
    height: 100%;
    user-select: none;
  }
</style>
