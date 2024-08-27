<script lang="ts">
  import { browser } from '$app/environment';
  import type { LatLngBounds, rectangle } from "leaflet";
  import type { Desk } from "$lib/utils/desk";
  import plan from "$lib/plan.png";
  import "leaflet/dist/leaflet.css";

  export let selectedDesk: Desk | null = null;

  let L: any;
  let promise: any;
  let map: L.Map;

  if (browser) {
        import("leaflet").then((leaflet) => {
            L = leaflet;
            initialize();
        });
    }

  async function initialize() {
    const desks = await getAllDesks();
      loadMap(desks);
  }

  async function getAllDesks(): Promise<Desk[]> {
    let desks: Desk[] = [];

    try {
      const res = await fetch("/api/desk/all");

      if (!res.ok) return desks;

      const unformatedDesks = await res.json();

      unformatedDesks.forEach((unDesk: any) => {
        let desk: Desk = {
          id: unDesk.id,
          x: unDesk.x,
          y: unDesk.y,
          width: unDesk.width,
          height: unDesk.height,
          rect: null,
        };
        desks.push(desk);
      });
      return desks;
    } catch (error) {
      console.error(error);
      return desks;
    }
  }

  async function loadMap(desks: Desk[]) {
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
      if (desk.rect) {
        desk.rect.on("click", () => {
          handleDeskClick(desk);
        });
      }
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
  }
</script>

<div id="map"></div>
  
<style>
  #map {
    width: 100%;
    height: 100%;
    user-select: none;
  }
</style>