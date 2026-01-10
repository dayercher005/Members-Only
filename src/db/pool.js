import dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config();

const ConnectionString = process.env.LOCAL_DATABASE_URL

export const pool = new Pool({
    connectionString: ConnectionString
})