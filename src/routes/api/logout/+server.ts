import { type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({cookies}) => {
    cookies.delete("auth", {path: "/"});
    return new Response("Logout successfull", {
        status: 200
    });
};

