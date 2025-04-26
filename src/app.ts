import { Context, Hono } from "hono";
import { serveStatic } from "hono/bun";
import { serveHTML } from "./helpers/serverHTML";
import authRouter from "./routes/auth";
import booksRouter from "./routes/books";
import { CookieStore, Session, sessionMiddleware } from "hono-sessions";
import { SessionDataTypes } from "./model/types";
import { authMiddleware } from "./middlewares/authMiddleware";
import { checkMiddleware } from "./middlewares/checkMiddleware";
import adminRouter from "./routes/adminRoutes";
import cartRouter from "./routes/cartRoutes";
import cartItemRouter from "./routes/cartItemRoutes";
import addressesRouter from "./routes/addresses";
import ordersRouter from "./routes/order";
import orderItemsRouter from "./routes/orderItems";
import shipmentRouter from "./routes/shipment";

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
app.route("/api", booksRouter);
app.route("/api", adminRouter);
app.route("/api", cartRouter);
app.route("/api", cartItemRouter);
app.route("/api", addressesRouter);
app.route("/api", ordersRouter);
app.route("/api", orderItemsRouter);
app.route("/api", shipmentRouter);

app.get("/logout", async (c: Context) => {
  const session = c.get("session");
  session.forget("id");
  session.forget("jwt");
  return c.redirect(`/login`, 302);
});

app.get("/login", checkMiddleware, (c) => c.html(serveHTML("login.html")));
app.get("/register", checkMiddleware, (c) =>
  c.html(serveHTML("register.html")),
);
app.get("/home", authMiddleware, (c) => c.html(serveHTML("index.html")));
app.get("/dashboard", (c) => c.html(serveHTML("admin-dashboard.html")));
app.get("/customers", (c) => c.html(serveHTML("customer.html")));
app.get("/reports", (c) => c.html(serveHTML("reports.html")));
app.get("/", (c) => c.html(serveHTML("login-buttons.html")));
app.get("/admin-login", (c) => c.html(serveHTML("login_admin.html")));

export default app;
