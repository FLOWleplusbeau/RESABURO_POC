import type { Cookies } from "@sveltejs/kit";

const defaultMaxAge = 60 * 60 * 24 * 7;

export function setAuthCookie(
  cookies: Cookies,
  token: string,
  maxAge: number = defaultMaxAge
) {
  cookies.set("auth", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: maxAge,
  });
}
