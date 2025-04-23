import { Context, Hono } from "hono";
import { serveStatic } from "hono/bun";
import { serveHTML } from "./helpers/serverHTML";
import authRouter from "./routes/auth";
import { CookieStore, Session, sessionMiddleware } from "hono-sessions";
import { SessionDataTypes } from "./model/types";
import { authMiddleware } from "./middlewares/authMiddleware";
import { checkMiddleware } from "./middlewares/checkMiddleware";

const app = new Hono<{
  Variables: {
    session: Session<SessionDataTypes>;
  };
}>();

const store = new CookieStore();

app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: process.env.ENCRYPTION_KEY,
    expireAfterSeconds: 2592000,
    cookieOptions: {
      sameSite: "Lax",
      path: "/",
      httpOnly: true,
    },
  }),
);

app.use("/static/*", serveStatic({ root: "./src/" }));

app.route("/api", authRouter);
app.post("/logout", async (c: Context) => {
  const session = c.get("session");
  session.forget("id");
  session.forget("jwt");
  return c.json({ message: "Logged out successfully" });
});

app.get("/login", checkMiddleware, (c) => c.html(serveHTML("login.html")));
app.get("/register", checkMiddleware, (c) =>
  c.html(serveHTML("register.html")),
);
app.get("/home", authMiddleware, (c) => c.html(serveHTML("index.html")));

export default app;
