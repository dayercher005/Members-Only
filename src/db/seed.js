#! /usr/bin/env node

import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const SQL = `
CREATE TABLE IF NOT EXISTS members(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    message VARCHAR ( 255 )
);

INSERT INTO members(name, email, password) VALUES
    ('Raphael Ho Zi Jie', 'raphaelhozj@gmail.com', '676767');

INSERT INTO messages(name, email, message) VALUES
    ('Raphael Ho Zi Jie', 'raphaelhozj@gmail.com', 'I goon to Arsernal');

`

async function DatabaseLoader(){
  console.log("Populating database via script");

  const ConnectionString = process.env.LOCAL_DATABASE_URL
  const client = new Client({
      connectionString: ConnectionString
  })
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

DatabaseLoader();