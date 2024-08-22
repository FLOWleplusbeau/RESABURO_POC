import { fail, redirect, type Actions, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";
import type { User } from "@prisma/client";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { date } = params;
  const { user } = locals;

  if (!user) {
    throw redirect(302, "/login");
  }

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
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const todayUserAttendance = await prisma.attendance.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
      userId: user.id,
    },
  });

  

  return {
    attendances,
    user,
    todayUserAttendance,
  };
};

export const actions: Actions = {
  createAttendance: async ({ request, locals }) => {
    const { name, date, attended } = Object.fromEntries(
      await request.formData()
    ) as unknown as { name: string; date: Date; attended: string };

    const isAttended: boolean = attended ? true : false;
    const user: User = locals.user;

    if (!user) return fail(400, { message: "User not connected" });

    try {
      await prisma.attendance.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
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
