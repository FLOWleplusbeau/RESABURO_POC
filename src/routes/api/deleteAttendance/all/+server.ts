import { fail, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const DELETE: RequestHandler = async () => {
  try {
    await prisma.attendance.deleteMany();
  } catch (error) {
    fail(500, { message: "Failed to delete attendances" });
  }
  return new Response("All attendances deleted with success !", {
    status: 200,
  });
};
