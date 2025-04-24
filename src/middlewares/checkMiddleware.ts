import { Context, Next } from "hono";
import { verifyToken } from "../utils/helpers";

export const checkMiddleware = async (c: Context, next: Next) => {
  const session = c.get("session");
  const jwt = session.get("jwt");

  if (!jwt) {
    session.forget("id");
    session.forget("jwt");
    await next();
    return;
  }

  try {
    const decoded = verifyToken(jwt);
    c.set("user", decoded);
    return c.redirect(`/home`, 302);
  } catch (err) {
    session.forget("id");
    session.forget("jwt");
    return c.redirect(`/login`, 302);
  }
};
