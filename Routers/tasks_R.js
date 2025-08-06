const express = require('express');
const router = express.Router();
const { AddTask, EditTask } = require('../Middleware/task_Mid');


// main for tasks pages
router.get('/', (req, res) => {
    // if (!req.user) return res.redirect('/');

    res.render('tasks_menu', {
        user: req.user
    });
});



//  GET add tasks pages
router.get('/add', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('tasks_add', {
        user: req.user
    });
});


// שליחת טופס הוספה
router.post('/add', AddTask, (req, res) => {

});




//  GET Edit tasks pages
router.get('/edit', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('tasks_edit', {
        user: req.user
    });
});

// שליחת טופס עריכה
router.post('/edit', EditTask, (req, res) => {

});



module.exports = router;
