import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export interface UserJwtPayload {
  userId: string
  email: string
  userType: string
}

export async function verifyAuth(token: string): Promise<UserJwtPayload | null> {
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as UserJwtPayload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.split(" ")[1]
}

