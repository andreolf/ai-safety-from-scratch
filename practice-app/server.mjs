// A tiny local HTTP endpoint, so tools that speak HTTP can test the bot.
//   node server.mjs        then: curl -s localhost:8787/chat -d '{"message":"hello"}'
// It listens on 127.0.0.1 only. Never expose a test target to the internet.
import http from 'node:http';
import { reply } from './bot.mjs';
const PORT = Number(process.env.PORT || 8787);
http.createServer((req, res) => {
  if (req.method !== 'POST' || !req.url.startsWith('/chat')) { res.writeHead(404); return res.end('POST /chat with {"message": "..."}\n'); }
  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 1e5) req.destroy(); });
  req.on('end', () => {
    let message = '';
    try { message = JSON.parse(body || '{}').message || ''; } catch { res.writeHead(400); return res.end('{"error":"send JSON"}\n'); }
    const raw = new URL(req.url, 'http://x').searchParams.get('raw') === '1';
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ reply: reply(message, { guard: !raw }) }) + '\n');
  });
}).listen(PORT, '127.0.0.1', () => console.log(`Pebble listening on http://127.0.0.1:${PORT}/chat`));
