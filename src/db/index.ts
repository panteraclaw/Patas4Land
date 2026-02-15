/**
 * Database instance for Patas4Land
 * Uses Neon Postgres with Drizzle ORM
 */

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL;

// Mock DB for development when DATABASE_URL is missing
const createMockDb = () => ({
  select: () => ({
    from: () => ({
      leftJoin: () => ({
        where: () => ({
          orderBy: () => Promise.resolve([])
        })
      })
    })
  }),
  insert: () => ({
    values: () => ({
      returning: () => Promise.resolve([])
    })
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: () => Promise.resolve([])
      })
    })
  }),
  delete: () => ({
    where: () => Promise.resolve({ rowCount: 0 })
  })
});

// Export database instance
export const db = databaseUrl 
  ? drizzle(neon(databaseUrl), { schema })
  : (createMockDb() as any);

// Log warning if using mock DB
if (!databaseUrl) {
  console.warn('⚠️  DATABASE_URL not set - using mock DB (data will not persist)');
}

// Export schema for convenience
export * from './schema';
