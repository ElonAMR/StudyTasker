//npm install express ,ejs ,dotenv, mysql2

const express = require('express');
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// הגדרות תצוגה
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// קבצים סטטיים
app.use(express.static(path.join(__dirname, "public")));

// תמיכה ב-POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// דוגמה למסך בית
app.get("/", (req, res) => {
    res.render("login", { user: "אורח" });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});