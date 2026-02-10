/**
 * Server middleware: Add security headers to all responses.
 */
export default defineEventHandler((event) => {
  // Security headers
  setHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  })
})
