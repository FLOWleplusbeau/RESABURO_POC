import { fail, redirect, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { comparePasswords, createJwtToken } from "$lib/server/auth";
import { setAuthCookie } from "$lib/utils/cookies";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    // get the email and password from the form
    const { email, password } = Object.fromEntries(
      await request.formData()
    ) as unknown as { email: string; password: string };

    if (email === "") return fail(400, { message: "Name is required" });

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return fail(404, { error: "User not found" });
      }

      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) {
        return fail(401, { error: "Invalid password" });
      }

      const token = createJwtToken({ id: user.id });

      setAuthCookie(cookies, token);

      throw redirect(303, "/");
    } catch (error) {
      return fail(500, { error: "Failed login" });
    }
  },
};
