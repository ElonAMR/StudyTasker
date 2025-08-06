const express = require('express');
const router = express.Router();

// main for tasks pages
router.get('/', (req, res) => {
    // if (!req.user) return res.redirect('/');

    res.render('tasks_menu', {
        user: req.user
    });
});


//  add tasks pages
router.get('/add', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('tasks_add', {
        user: req.user
    });
});








module.exports = router;
