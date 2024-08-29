import { fail, redirect, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { hashPassword, createJwtToken } from "$lib/server/auth";
import { setAuthCookie } from "$lib/utils/cookies";

export const actions: Actions = {
  register: async ({ request, cookies }) => {
    const { name, email, password } = Object.fromEntries(
      await request.formData()
    ) as unknown as { name: string; email: string; password: string };

    if (name === "") return fail(400, { message: "Name is required" });
    if (email === "") return fail(400, { message: "Email is required" });

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return fail(400, { error: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name: name,
          email,
          password: hashedPassword,
        },
      });

      const token = createJwtToken({ id: user.id });

      setAuthCookie(cookies, token);

      throw redirect(303, "/test");
    } catch (error) {
      return fail(500, { error: "Failed Register" });
    }
  },
};
