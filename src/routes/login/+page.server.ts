import { fail, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { comparePasswords, createJwtToken } from "$lib/server/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
  console.log(locals.user);
};

export const actions: Actions = {
    login: async ({request, cookies}) => {
        const { email, password } = Object.fromEntries(await request.formData()) as unknown as { email: string, password: string };

        if (email === "")
            return fail(400, { message: "Name is required" });

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
              return fail(404, { error: 'User not found' });
            }
        
            const isValidPassword = await comparePasswords(password, user.password);
            if (!isValidPassword) {
              return fail(401, { error: 'Invalid password' });
            }
        
            const token = createJwtToken({ id: user.id });

            cookies.set('auth', token, {
              path: '/',
              httpOnly: true,
              sameSite: "strict",
              maxAge: 60 * 60 * 24 * 7,
          });
        
            return {
                status: 201,
                body: {
                    message: "Login Successfull",
                },
            };
          } catch (error) {
            return fail(500, { error: 'Failed login' });
          }
    },
};