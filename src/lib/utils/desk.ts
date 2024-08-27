import type { Rectangle } from "leaflet";
import type { Desk } from "@prisma/client";

export type Desk_t = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rect: Rectangle | null;
};

export function createDesk(desk: Desk): Desk_t {
  let newdesk: Desk_t = {
    id: desk.id,
    x: desk.x,
    y: desk.y,
    width: desk.width,
    height: desk.height,
    rect: null,
  };
  return newdesk
}