#! /usr/bin/env node

import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const SQL = `
CREATE TABLE IF NOT EXISTS members(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    password VARCHAR ( 255 ),
    membership VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    date TIMESTAMP DEFAULT NOW(),
    message VARCHAR ( 255 )
);


INSERT INTO members(name, email, password) VALUES
    ('Raphael Ho Zi Jie', 'raphaelhozj@gmail.com', '676767'),
    ('Hector Chia Yi Tao', 'raptox107@gmail.com', '6767676'),
    ('Tan Yi Rui', 'yirui23@gmail.com', '696969'),
    ('Ting Wey Jay Gerard', 'g3r00dsicpark@gmail.com', '69696969');

INSERT INTO messages(name, message) VALUES
    ('Raphael Ho Zi Jie', 'I love Arsernal'),
    ('Hector Chia Yi Tao', 'I love RSAF'),
    ('Tan Yi Rui', 'I love RSAF too'),
    ('Ting Wey Jay Gerard', 'I love Yifan Li');


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