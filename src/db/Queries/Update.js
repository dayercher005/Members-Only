import { pool } from '../pool.js';
import dotenv from 'dotenv';

dotenv.config();

export async function UpdateMembership(password, id){
    await pool.query('UPDATE members SET membership = admin WHERE id = $2 AND ${process.env.ADMIN_PASSWORD} = $1', [password, id])
}