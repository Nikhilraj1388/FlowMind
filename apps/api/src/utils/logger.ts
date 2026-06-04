import winston from 'winston';

/**
 * Structured JSON logger — Section 6.6
 * Console transport for dev; add Datadog/Logtail in production.
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'flowmind-api' },
  transports: [new winston.transports.Console()],
});
