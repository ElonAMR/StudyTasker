const express = require('express');
const router = express.Router();
const { AddTask, EditTask,ShowTasks,DeleteTask} = require('../Middleware/task_Mid');


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



router.get('/list', ShowTasks, (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('tasks/tasks_list', {
        user: req.user,
        tasks: req.tasks
    });
});




// תצוגת טופס מחיקה
router.get('/delete', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('tasks/tasks_delete');
});

// שליחת בקשת מחיקה
router.post('/delete', DeleteTask, (req, res) => {

});

module.exports = router;
