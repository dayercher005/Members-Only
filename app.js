import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SignUpFormRouter } from './src/routes/Sign-Up/sign-up.js';
import { LogInFormRouter } from './src/routes/Log-In/log-in.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "/public/");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/sign-up", SignUpFormRouter);
app.use("/log-in", LogInFormRouter);


const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    return error
  }
  console.log(`Members-Only Application - listening on port ${PORT}!`);
});