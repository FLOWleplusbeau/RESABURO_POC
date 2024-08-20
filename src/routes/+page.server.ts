import { fail, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        attendances: await prisma.attendance.findMany(),
    }
};

export const actions: Actions = {
    createAttendance: async ({request}) => {
        const { name } = Object.fromEntries(await request.formData()) as { name: string };

        try {
            await prisma.attendance.create({
                data: {
                    name,
                    date: new Date(),
                    attended: false,
                },
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: "Failed to create attendance" });
        }

        return {
            status: 201,
            body: { message: "Attendance created" },
        };
    },
};