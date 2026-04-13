import fp from 'fastify-plugin'
import { Registry, Counter, Histogram, collectDefaultMetrics } from 'prom-client'

const registry = new Registry()
collectDefaultMetrics({ register: registry })

export const tokenIssuedCounter = new Counter({
  name: 'farm_tokens_issued_total',
  help: 'Total credit tokens issued',
  labelNames: ['region', 'crop_type'],
  registers: [registry]
})

export const repaymentHistogram = new Histogram({
  name: 'farm_repayment_duration_days',
  help: 'Days taken to repay credit',
  buckets: [30, 60, 90, 120, 150, 180, 210, 365],
  registers: [registry]
})

export const metricsPlugin = fp(async (fastify) => {
  fastify.get('/metrics', async (_, reply) => {
    reply.header('Content-Type', registry.contentType)
    return registry.metrics()
  })
})
