import 'server-only'
import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Cache HTTP connections across invocations (serverless/edge)
neonConfig.fetchConnectionCache = true
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string')
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql, {
  schema,
})


