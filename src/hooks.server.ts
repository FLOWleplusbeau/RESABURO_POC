import type { Handle } from "@sveltejs/kit";
import { authentificateUser } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await authentificateUser(event);
  const response = await resolve(event);
  return response;
};
