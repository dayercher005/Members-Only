#! /usr/bin/env node

import { pool } from './pool.js';


const SQL = `
CREATE TABLE IF NOT EXISTS members(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    password VARCHAR ( 255 ),
    membership VARCHAR ( 255 )
)

CREATE TABLE IF NOT EXISTS message_tracker(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    message VARCHAR ( 255 )
)

`

async function DatabaseLoader(){
  console.log("Populating database via script");

  await pool.connect();
  await pool.query(SQL);
  await pool.end();
  console.log("Done");
}

DatabaseLoader();