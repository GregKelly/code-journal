import dotenv from 'dotenv';
import app from './app.js';
import pool from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Test database connection before starting server
async function startServer() {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✓ Database connection verified');

    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api`);
      console.log(`✓ Health check at http://localhost:${PORT}/health`);
      console.log(`\nEnvironment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    console.error('\nMake sure PostgreSQL is running:');
    console.error('  npm run db:up');
    process.exit(1);
  }
}

startServer();
