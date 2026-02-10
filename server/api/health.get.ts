export default defineEventHandler(() => {
  return createApiResponse({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
  })
})
