import type { Rectangle } from "leaflet";

export type Desk = {
    x: number;
    y: number;
    width: number;
    height: number;
    rect: Rectangle | null;
}