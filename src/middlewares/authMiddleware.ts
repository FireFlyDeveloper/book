import { Context, Next } from "hono";
import { verifyToken } from "../utils/helpers";

export const authMiddleware = async (c: Context, next: Next) => {
  const session = c.get("session");
  const jwt = session.get("jwt");

  try {
    const decoded = verifyToken(jwt);
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.redirect(`/login`, 302);
  }
};
