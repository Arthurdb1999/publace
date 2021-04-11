import { Client } from 'pg'

const db = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'publace'
})

export default db