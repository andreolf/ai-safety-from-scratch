// Site-wide constants. Change cross-site links here only.
export const SITE_NAME = 'AI Safety from Scratch';
export const SITE_URL = 'https://andreolf.github.io/ai-safety-from-scratch/';
export const SECURITY_URL = 'https://andreolf.github.io/security-from-scratch/'; // sibling site (D7)
export const STORE_KEY = 'aisfs-v1';
export const CERT_PREFIX = 'AISFS-CERT-1';
export const PASS = 0.8;
export const TEST_N = 10;
export const POINTS = { lesson: 50, question: 10, test: 250 };
export const LAST_CHECKED = '2026-10-26';
// Security from Scratch lesson link: #/learn/<id> on the sibling site.
export const securityLesson = (id) => `${SECURITY_URL}#/learn/${id.replace('.', '-')}`;
// Full disclosure note (curriculum §11). Shown in the footer, in full at the top of Phase 06, and next to any MetaMask mention.
export const DISCLOSURE = 'AI Safety from Scratch is a personal, free project by Francesco Andreoli. Francesco works at MetaMask (Consensys) as Head of Developer Relations and works on agent wallets. This site is not an official MetaMask or Consensys product and is not endorsed by them, or by ETH Zurich, OWASP, any AI company or any government body. The agents-and-payments lessons (Phase 06) are written to be wallet-neutral. Where MetaMask is mentioned, it is one example among others, and the page says so.';
