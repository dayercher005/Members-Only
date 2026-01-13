import { pool } from '../pool.js';
import dotenv from 'dotenv';

dotenv.config();

export async function UpdateMembership(admin, id){
    await pool.query('UPDATE members SET membership = $1 WHERE id = $2', [admin, id])
}