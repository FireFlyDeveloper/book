import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { serveHTML } from "./helpers/serverHTML";
import authRouter from "./routes/auth";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./src/" }));
app.route("/api", authRouter);

app.get("/login", (c) => c.html(serveHTML("login.html")));
app.get("/register", (c) => c.html(serveHTML("register.html")));

export default app;
