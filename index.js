//npm install express ,ejs ,body-parser ,dotenv, mysql2 ,slashes@2.0.0 , md5 , jsonwebtoken , cookie-parser

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;


let cookieParser = require('cookie-parser');
app.use(cookieParser());
global.jwt = require('jsonwebtoken');


let db_M =require('./db');
global.db_pool = db_M.pool;

// הגדרות תצוגה
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


global.addSlashes    = require('slashes').addSlashes;
global.stripSlashes  = require('slashes').stripSlashes;




// Routers && Pages
const authRoutes = require("./Routers/auth_R");
app.use("/", authRoutes);

const dashboardRoutes = require('./Routers/dashboard_R');
app.use('/dashboard', dashboardRoutes);

const tasksRoutes = require('./Routers/tasks_R');
app.use('/tasks', tasksRoutes);

const categoryRoutes = require('./Routers/category_R');
app.use('/category', categoryRoutes);





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// // בדיקת חיבור למסד נתונים
// async function testDBConnection() {
//     try {
//         const [rows] = await db_M.query("SELECT 1");
//         console.log("✅ Database connected successfully!");
//     } catch (err) {
//         console.error("❌ Failed to connect to database:", err);
//     }
// }
//
// testDBConnection();