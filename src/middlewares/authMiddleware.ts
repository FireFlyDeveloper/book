import { Context, Next } from "hono";
import { verifyToken } from "../utils/helpers";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
