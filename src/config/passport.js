import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from './src/db/pool.js';

Passport.use(
    new LocalStrategy( async (username, password, done) => {
        try{
            const { rows } = await pool.query('SELECT * FROM members WHERE username = $1', [username])
            const member = rows[0];

            if (!member){
                return done(null, false, {message: "Incorrect Username"})
            }

            if (member.password !== password){
                return done(null, false, {message: "Incorrect password"})
            }
        } catch(error){
            return done(error)
        }
    })
)

Passport.serializeUser((member, done) => {
    done(null, member.id)
})

Passport.deserializeUser( async (id, done) => {
    try{
        const { rows } = pool.query('SELECT * FROM members WHERE id = $1', [id])
        const member = rows[0];

        done(null, member);
    } catch(error){
        done(error)
    }
})