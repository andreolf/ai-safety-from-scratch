// Site-wide constants. Change cross-site links here only.
export const SITE_NAME = 'AI Safety from Scratch';
export const SITE_URL = 'https://andreolf.github.io/ai-safety-from-scratch/'; // D2. Unlisted draft preview only (noindex); not launched
export const SECURITY_URL = 'https://andreolf.github.io/security-from-scratch/'; // sibling site (D7); not built yet
export const STORE_KEY = 'aisfs-v1';
export const CERT_PREFIX = 'AISFS-CERT-1';
export const PASS = 0.8;
export const TEST_N = 10;
export const POINTS = { lesson: 50, question: 10, test: 250 };
export const LAST_CHECKED = '2026-10-26';
// Security from Scratch lesson link: #/learn/<id> on the sibling site.
export const securityLesson = (id) => `${SECURITY_URL}#/learn/${id.replace('.', '-')}`;
