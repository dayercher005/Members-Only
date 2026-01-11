import LocalStrategy from 'passport-local';
import { pool } from '../db/pool.js';

export async function PassportConfiguration(passport){    
    passport.use(
        new LocalStrategy( async (email, password, done) => {
            try{
                const { rows } = await pool.query('SELECT * FROM members WHERE email = $1', [email])
                const member = rows[0];

                if (!member){
                    return done(null, false, {message: "Incorrect Username"})
                }

                if (member.password !== password){
                    return done(null, false, {message: "Incorrect password"})
                }
                return done(null, member);

            } catch(error){
                return done(error)
            }
        })
    )

    passport.serializeUser((member, done) => {
        done(null, member.id);
    })

    passport.deserializeUser( async (id, done) => {
        try{
            const { rows } = await pool.query('SELECT * FROM members WHERE id = $1', [id])
            const member = rows[0];
            done(null, member);
        } catch(error){
            done(error)
        }
    })

}