const express = require('express');
const router = express.Router();

// main for tasks pages
router.get('/', (req, res) => {
    // if (!req.user) return res.redirect('/');

    res.render('tasks_menu', {
        user: req.user
    });
});

module.exports = router;
