import { FastifyRequest, FastifyReply } from 'fastify'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    
    // Redis integration for blacklisting token should go here
    // const token = request.headers.authorization?.split(' ')[1]
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}

export function authorize(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as { role: string }
    if (!roles.includes(user.role)) {
      return reply.status(403).send({ error: 'Insufficient permissions' })
    }
  }
}