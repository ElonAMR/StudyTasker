// import for connect to db
const mysql = require("mysql2");

//import variable in .env page
require("dotenv").config();

let HOST = process.env.DB_HOST;
let USER = process.env.DB_USER;
let PASSWORD = process.env.DB_PASSWORD;
let DATABASE = process.env.DB_NAME;


let pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})


//export & use for async
module.exports = pool.promise();
