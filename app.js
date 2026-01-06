import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "/public/");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));



const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    renderErrorPage()
  }
  console.log(`Game Inventory Application - listening on port ${PORT}!`);
});