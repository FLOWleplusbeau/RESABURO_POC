import { fail, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const DELETE: RequestHandler = async (request) => {
    const id: string | undefined = request.params.id;

    if (!id) fail(400, { message: "Missing attendance id" });

    try {
        await prisma.attendance.delete({ where: { id: id } });
    } catch (error) {
        fail(500, { message: "Failed to delete attendance" });
    }

    return new Response("All attendances deleted with success !", { status: 200 });
};