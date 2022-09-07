import { Pool } from 'pg';

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
let POSTGRES_BD;

if (process.env.ENV === 'dev') {
   POSTGRES_BD = process.env.POSTGRES_BD;
}
if (process.env.ENV === 'test') {
   POSTGRES_BD = process.env.POSTGRES_TEST_BD;
}

const client = new Pool({
   host: POSTGRES_HOST,
   database: POSTGRES_BD,
   user: POSTGRES_USER,
   password: POSTGRES_PASSWORD
});

export default client;
