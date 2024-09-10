import { prisma } from '$lib/server/prisma';
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import type { RequestEvent } from "@sveltejs/kit";

dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function createJwtToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyJwtToken(token: string): any {
  return jwt.verify(token, SECRET);
}

export function decryptToken(token: string): any {
  try {
    // decrypt
    const decodedToken = jwt.verify(token, SECRET);

    //check expiration
    const { exp } = decodedToken as JwtPayload;
    if (!exp) {
      throw new Error("Invalid token");
    }
    const expirationDate = new Date(exp * 1000);

    if (expirationDate < new Date()) {
      throw new Error("Token has expired");
    }
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export async function authentificateUser(event: RequestEvent) {
  const { cookies } = event;

  const token = cookies.get("auth");

  if (!token) {
    return null;
  }
  try {
    const decryptedToken = decryptToken(token);
    console.log(decryptedToken);
    if (!decryptedToken) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decryptedToken.id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
