import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IndexRouter } from './src/routes/MessagesPage/index.js';
import { SignUpFormRouter } from './src/routes/Sign-Up/sign-up.js';
import { LogInFormRouter } from './src/routes/Log-In/log-in.js';
import { LogOutRouter } from './src/routes/Log-Out/log-out.js';
import { ErrorRouter } from './src/routes/Error/error.js';
import { pool } from './src/db/pool.js';
import passport from 'passport';
import session from 'express-session';
import LocalStrategy from 'passport-local';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "/public/");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())

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


app.use("/", IndexRouter);
app.use("/sign-up", SignUpFormRouter);
app.use("/log-in", LogInFormRouter);
app.use("/log-out", LogOutRouter);
app.use("/error", ErrorRouter);


const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    return error
  }
  console.log(`Members-Only Application - listening on port ${PORT}!`);
});