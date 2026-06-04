// middleware.js
// ----------------------------------------------------------------------------
// Place this file in the ROOT of your website's repo (same folder as package.json).
// It locks the /portfolio page behind a username + password that is checked on
// Vercel's servers BEFORE the page is ever sent. The username/password are NOT
// in this file or in any code the visitor can see — they live in Vercel's
// Environment Variables (you'll set PORTFOLIO_USER and PORTFOLIO_PASS).
//
// It only touches /portfolio — the rest of chdkindia.com is left completely alone.
// ----------------------------------------------------------------------------

export const config = {
  // Only these paths are protected. Everything else on the site is untouched.
  matcher: ['/portfolio', '/portfolio.html'],
};

export default function middleware(request) {
  const USER = process.env.PORTFOLIO_USER;
  const PASS = process.env.PORTFOLIO_PASS;

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded);          // becomes "username:password"
    const i = decoded.indexOf(':');
    const user = decoded.slice(0, i);
    const pass = decoded.slice(i + 1);
    if (user === USER && pass === PASS) {
      return; // correct credentials -> allow the request through to the page
    }
  }

  // Missing or wrong credentials -> ask the browser to show its login popup.
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CHDK Portfolio", charset="UTF-8"',
    },
  });
}