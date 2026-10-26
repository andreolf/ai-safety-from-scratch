// Certificates: drawn in the browser (canvas), exported as PNG or a minimal hand-built PDF.
// The drawing lives in drawCert() so the branding kit's certificate template can replace it.
import { CERT_PREFIX } from './config.js';
import { foundationPhases, builderPhases } from './course.js';

export const CERT_W = 2000, CERT_H = 1414; // A4 landscape ratio
export const CREDENTIALS = {
  foundations: { title: 'Foundations', line: 'AI Safety from Scratch: Foundations', phases: () => foundationPhases.map((p) => p.id), what: 'Phases 00 to 10: how AI works, how it fails, misuse, prompt injection, agents, alignment, testing and governance.' },
  builder: { title: 'Builder', line: 'AI Safety from Scratch: Builder', phases: () => builderPhases.map((p) => p.id), what: 'Phase 11: red-teaming, scanning and guarding an AI app with open-source tools.' },
};
export const DISCLAIMER = 'Free certificate of completion. Not accredited, not a professional or security qualification. Not affiliated with or endorsed by ETH Zurich, MetaMask, Consensys, OWASP, any AI lab or any government body.';
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32
export const normName = (s) => String(s || '').normalize('NFC').trim().replace(/\s+/g, ' ');
export const cleanCode = (s) => String(s || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
export function codeFromDigest(buf) {
  let bits = 0, val = 0, out = '';
  for (let i = 0; i < 10; i++) { val = ((val << 8) | buf[i]) & 0xffff; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } }
  return out.match(/.{4}/g).join('-');
}
export const certPayload = (name, key, phaseIds, date) => `${CERT_PREFIX}|${normName(name).toLowerCase()}|${key}|${phaseIds.join(',')}|${date}`;
export async function certCode(name, key, date) {
  const c = CREDENTIALS[key]; if (!c) return '';
  const buf = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(certPayload(name, key, c.phases(), date))));
  return codeFromDigest(buf);
}
function wrap(ctx, text, maxW) { const words = text.split(' '), lines = []; let cur = ''; for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur); return lines; }
const F = (w, size, wdth = 100) => `${w} ${size}px 'Archivo Variable', Archivo, system-ui, sans-serif`;

export async function drawCert(canvas, { name, key, dateLabel, code, verifyUrl }) {
  try { await Promise.all([document.fonts.load(F(900, 80)), document.fonts.load(F(400, 30))]); } catch {}
  const c = CREDENTIALS[key]; canvas.width = CERT_W; canvas.height = CERT_H;
  const g = canvas.getContext('2d'); const HL = '#EEFF41';
  g.fillStyle = '#000'; g.fillRect(0, 0, CERT_W, CERT_H);
  g.strokeStyle = '#2A2A2A'; g.lineWidth = 4; g.strokeRect(60, 60, CERT_W - 120, CERT_H - 120);
  // brand mark
  g.fillStyle = HL; g.beginPath(); g.roundRect(130, 130, 96, 96, 18); g.fill();
  g.fillStyle = '#000'; g.font = F(900, 44); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('AI', 178, 180);
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillStyle = '#fff'; g.font = F(800, 38); g.fillText('AI Safety from Scratch', 256, 176);
  g.fillStyle = '#B8B8B8'; g.font = F(400, 28); g.fillText('How AI works, how it fails, and how to stay in control.', 256, 216);
  g.fillStyle = '#fff'; g.font = F(900, 104); g.fillText('CERTIFICATE', 130, 420); g.fillText('OF COMPLETION', 130, 530);
  g.fillStyle = '#B8B8B8'; g.font = F(400, 34); g.fillText('This certifies that', 130, 640);
  // the one highlighted line: the name
  const nm = name || 'Your name'; g.font = F(900, 92); const nw = Math.min(g.measureText(nm).width, CERT_W - 300);
  g.fillStyle = HL; g.fillRect(118, 668, nw + 28, 118);
  g.fillStyle = '#000'; g.fillText(nm, 132, 760, CERT_W - 300);
  g.fillStyle = '#fff'; g.font = F(400, 36); g.fillText('completed', 130, 860);
  g.font = F(800, 50); g.fillText(c.line, 130, 925);
  g.fillStyle = '#B8B8B8'; g.font = F(400, 30); wrap(g, c.what, 1700).forEach((l, i) => g.fillText(l, 130, 985 + i * 40));
  g.fillStyle = '#fff'; g.font = F(800, 32); g.fillText(`Date: ${dateLabel}`, 130, 1110);
  g.fillText(`Verification code: ${code}`, 130, 1160);
  g.fillStyle = '#B8B8B8'; g.font = F(400, 24); g.fillText(`Check it at ${verifyUrl}`, 130, 1200);
  wrap(g, DISCLAIMER, 1740).forEach((l, i) => g.fillText(l, 130, 1268 + i * 32));
}

export function pdfFromCanvas(canvas) {
  const jpg = atob(canvas.toDataURL('image/jpeg', 0.93).split(',')[1]);
  const img = new Uint8Array(jpg.length); for (let i = 0; i < jpg.length; i++) img[i] = jpg.charCodeAt(i);
  const PW = 842, PH = 595, enc = new TextEncoder();
  const content = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
  const chunks = [], offsets = []; let len = 0;
  const push = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; chunks.push(b); len += b.length; };
  push('%PDF-1.4\n');
  const obj = (n, body) => { offsets[n] = len; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
  obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));
  obj(3, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`));
  obj(4, () => { push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`); push(img); push('\nendstream'); });
  obj(5, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
  obj(6, () => push('<< /Title (AI Safety from Scratch certificate of completion) /Creator (ai-safety-from-scratch, generated in the browser) >>'));
  const xref = len;
  push(`xref\n0 7\n0000000000 65535 f \n${[1, 2, 3, 4, 5, 6].map((n) => String(offsets[n]).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(chunks, { type: 'application/pdf' });
}
