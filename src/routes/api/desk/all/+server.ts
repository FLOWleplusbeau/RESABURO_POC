import { fail, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const GET: RequestHandler = async () => {
  let desks;
  try {
    desks = await prisma.desk.findMany();
  } catch (error) {
    fail(500, { message: "Failed to get desks" });
  }
  return new Response(JSON.stringify(desks), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
