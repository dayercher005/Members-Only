#! /usr/bin/env node

import { pool } from './pool.js';


const SQL = `

`

async function DatabaseLoader(){
  console.log("Populating database via script");

  await pool.connect();
  await pool.query(SQL);
  await pool.end();
  console.log("Done");
}

DatabaseLoader();