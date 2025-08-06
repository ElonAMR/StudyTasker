const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // if (!req.user) {
    //     return res.redirect('/');
    // }

    res.render('dashboard', {
        user: req.user
    });
});

module.exports = router;