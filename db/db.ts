import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { Pool } from 'pg';

// export const db = drizzle({
//     schema , 
//     connection : {
//         password: process.env.DB_PASSWORD!,
//         user: process.env.DB_USER!,
//         databse: process.env.DB_NAME!,
//         host: process.env.DB_HOST!
//     }
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  export const db = drizzle(pool, { 
    schema,
  });
