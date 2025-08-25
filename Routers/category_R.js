const express = require('express');
const router = express.Router();
const { AddCategory, EditCategory,ShowCategory, DeleteCategory } = require('../Middleware/category_Mid');


// main for category pages
router.get('/', (req, res) => {
    // if (!req.user) return res.redirect('/');

    res.render('categories_menu', {
        user: req.user
    });
});



//  GET add category pages
router.get('/add', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_add', {
        user: req.user
    });
});


router.post('/add', AddCategory, (req, res) => {
    if (req.success) {
        // אפשר רידיירקט לתפריט/רשימה
        // return res.redirect('/category');
        // או JSON לדיבוג:
        return res.status(200).json({ ok: true, id: req.insertId, user_id: req.user_id, name: req.newName });
    }

    const msg =
        req.reason === 'EMPTY' ? 'שם קטגוריה חובה' :
            req.reason === 'DB'    ? 'שגיאת מסד נתונים' : 'שגיאה בהוספה';

    return res.status(400).render('categories_add', { error: msg });
});




//  GET Edit category pages
router.get('/edit', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_edit', {
        user: req.user
    });
});


router.post('/edit', EditCategory, (req, res) => {
    if (req.success) {
        res.status(200).render('categories_edit', {
            user: req.user,
            message: `הקטגוריה עודכנה בהצלחה ל: ${req.updatedName}`
        });
    } else {
        const msg =
            req.reason === 'NOT_FOUND' ? 'לא נמצאה קטגוריה עם שם כזה' :
                req.reason === 'DB'        ? 'שגיאה במסד הנתונים' :
                    'שגיאה לא צפויה';

        res.status(400).render('categories_edit', {
            user: req.user,
            error: msg
        });
    }
});



router.get('/list', ShowCategory, (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_list', {
        user: req.user,
        tasks: req.tasks
    });
});




router.get('/delete', (req, res) => {
    // if (!req.user) return res.redirect('/');
    res.render('categories_delete');
});

router.post('/delete', DeleteCategory, (req, res) => {

});

module.exports = router;
