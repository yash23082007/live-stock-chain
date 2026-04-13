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
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://livestock.quantum.ag'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis: process.env.REDIS_URL ? undefined : undefined, // Will use default if not provided, or ioredis instance
    errorResponseBuilder: (request, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Heads up! You've reached the rate limit. Please try again in ${context.after}.`
    })
  })

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-quantum-key',
    sign: { expiresIn: '24h' }
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
  app.get('/health', async (request, reply) => {
    const health = {
      status: 'ok',
      timestamp: new Date(),
      services: {
        database: 'unknown',
        redis: 'unknown',
        blockchain: 'unknown'
      }
    };

    try {
      // Check Prisma
      await app.prisma.$queryRaw`SELECT 1`;
      health.services.database = 'healthy';
    } catch (e) {
      health.status = 'degraded';
      health.services.database = 'unhealthy';
    }

    // Check Blockchain RPC
    try {
      const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology/');
      await provider.getBlockNumber();
      health.services.blockchain = 'healthy';
    } catch (e) {
      health.status = 'degraded';
      health.services.blockchain = 'unhealthy';
    }

    if (health.status !== 'ok') {
      return reply.status(503).send(health);
    }
    return health;
  })

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
