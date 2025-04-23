import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { serveHTML } from './helpers/serverHTML';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './src/' }))

app.get('/login', (c) => c.html(serveHTML('login.html')));
app.get('/register', (c) => c.html(serveHTML('register.html')));

export default app;
