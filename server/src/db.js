import pg from "pg";

const { Pool } = pg;

// Neon requires SSL. This works locally + on Render.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});





