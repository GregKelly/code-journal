import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const { Pool } = pg;

let testPool;

export async function setupTestDb() {
  testPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Create tables
  await testPool.query(`
    CREATE TABLE IF NOT EXISTS entries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
  `);

  // Create trigger function
  await testPool.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  // Create trigger
  await testPool.query(`
    DROP TRIGGER IF EXISTS update_entries_updated_at ON entries;
    CREATE TRIGGER update_entries_updated_at
    BEFORE UPDATE ON entries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  return testPool;
}

export async function cleanupTestDb() {
  if (testPool) {
    await testPool.query('DELETE FROM entries');
  }
}

export async function closeTestDb() {
  if (testPool) {
    await testPool.end();
  }
}

export function getTestPool() {
  return testPool;
}
