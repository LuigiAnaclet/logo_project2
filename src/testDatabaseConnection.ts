import { Pool } from 'pg';
import { dbConfig } from './database.config'; // Make sure to provide the correct path to your database.config.ts file

const pool = new Pool(dbConfig);

pool.connect()
    .then(() => {
        console.log('Connected to the database successfully!');
        pool.end();
    })
    .catch((err: { message: any; }) => {
        console.error('Failed to connect to the database:', err.message);
        pool.end();
    });
