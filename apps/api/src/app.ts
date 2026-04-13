import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { prismaPlugin } from './plugins/prisma'

export async function buildApp() {
  const app = Fastify({ logger: true })

  // ── Plugins ──────────────────────────────────────────
  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  })

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret',
    sign: { expiresIn: '15m' }
  })

  await app.register(swagger, {
    openapi: {
      info: { title: 'Farm Input Finance API', version: '1.0.0' },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
      }
    }
  })

  await app.register(swaggerUI, { routePrefix: '/docs' })
  await app.register(prismaPlugin)

  // Health check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date() }))

  return app
}

if (require.main === module) {
  buildApp().then(app => {
    app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log('Server running on port 3001')
    })
  })
}
