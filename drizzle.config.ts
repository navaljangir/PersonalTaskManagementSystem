import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    out: './db/schema/migrations',
    schema : './db/schema.ts',
    strict : true,
    verbose : true,
    dialect : 'postgresql',
    dbCredentials : {
        url : process.env.DATABASE_URL!
    }
})