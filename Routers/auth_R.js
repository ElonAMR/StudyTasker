const express = require('express');
const router = express.Router();

const {CheckLogin} = require("../Middleware/user_Mid");

// GET /login
router.get("/", (req, res) => {
    res.render("login");
});

// POST /login
router.post("/", CheckLogin ,(req, res) => {
    if (req.validUser){
        res.send(` שלום, ${req.user.username}! תפקידך הוא: ${req.user.role}`);
    } else {
        res.status(401).send("שם משתמש או סיסמה שגויים");
    }
});


module.exports = router;