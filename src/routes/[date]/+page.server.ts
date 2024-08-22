import { fail, type Actions, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (page) => {
  const { params } = page;
  const { date } = params;

  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setDate(startOfDay.getDate() + 1);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
      attended: true,
    },
  });

  return {
    attendances,
  };
};

export const actions: Actions = {
  createAttendance: async ({ request }) => {
    const { name, date, attended } = Object.fromEntries(
      await request.formData()
    ) as unknown as { name: string; date: Date; attended: string };
    let isAttended: boolean = attended ? true : false;

    if (name === "") return fail(400, { message: "Name is required" });

    try {
      await prisma.attendance.create({
        data: {
          name,
          date: new Date(date),
          attended: isAttended,
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
