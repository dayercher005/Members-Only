import { pool } from '../pool.js';

export async function AddSignUpMembers(fullName, email, password){
    await pool.query('INSERT INTO (name, email, password) VALUES ($1, $2, $3)', [fullName, email, password]);
}