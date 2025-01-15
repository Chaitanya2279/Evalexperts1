const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'evalexpertsDB',
    password: 'tiger',
    port: 5432,
});

async function hashPasswords() {
    const result = await pool.query('SELECT username, password FROM instructor');
    for (let user of result.rows) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query('UPDATE instructor SET password = $1 WHERE username = $2', [hashedPassword, user.username]);
        console.log(`Updated password for user: ${user.username}`);
    }
    console.log('Password hashing complete.');
}

hashPasswords().catch(console.error);