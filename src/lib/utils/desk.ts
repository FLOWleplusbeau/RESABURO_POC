import type { LatLngBounds } from "leaflet";
import L from "leaflet";

export type Desk = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

function getBoundsFromDesk(desk: Desk): LatLngBounds {
    let bound: LatLngBounds = L.latLngBounds(
        [desk.x, desk.y],
        [desk.x + desk.width, desk.y + desk.height]
    );
    return bound;
}