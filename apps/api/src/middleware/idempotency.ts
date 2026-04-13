import { FastifyRequest, FastifyReply } from 'fastify'

export async function idempotencyMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const key = request.headers['idempotency-key'] as string
  if (!key) return

  // @ts-ignore
  const existing = await request.server.redis.get(`idempotency:${key}`)
  if (existing) {
    reply.status(200).send(JSON.parse(existing))
    return
  }

  const originalSend = reply.send.bind(reply)
  reply.send = (payload) => {
    // @ts-ignore
    request.server.redis.setex(
      `idempotency:${key}`,
      86400,
      JSON.stringify(payload)
    )
    return originalSend(payload)
  }
}
