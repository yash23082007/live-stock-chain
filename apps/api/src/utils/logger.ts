import pino from 'pino';

/**
 * @logger
 * @dev production-grade structured logger with sensitive data redaction.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['password', 'passwordHash', 'refreshToken', 'walletAddress', 'phone', 'email'],
    placeholder: '***'
  },
  serializers: {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        params: request.params,
        remoteAddress: request.ip,
      };
    },
    res(reply) {
      return {
        statusCode: reply.statusCode
      };
    },
    err: pino.stdSerializers.err,
  },
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    }
  } : undefined
});

export default logger;
