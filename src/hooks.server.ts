import type { Handle } from "@sveltejs/kit";
import { authentificateUser } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  try {
    event.locals.user = await authentificateUser(event);
  } catch (error) {
    event.locals.user = null;
  }
  const response = await resolve(event);
  return response;
};
