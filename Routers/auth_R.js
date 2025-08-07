const express = require('express');
const router = express.Router();

const user_Mid = require("../middleware/user_Mid");

// GET /login
router.get("/", (req, res) => {
    res.render("login",{});
});

// POST /login
router.post("/", user_Mid.CheckLogin, (req, res) => {
    if(req.validUser)
        res.redirect("/dashboard");
    else
        res.redirect("/");
});


module.exports = router;