require('dotenv').config()
module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'doan',
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, idle: 1000 }
}