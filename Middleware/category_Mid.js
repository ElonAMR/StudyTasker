// Middleware להוספת קטגוריה
async function AddCategory(req, res, next) {

    const name = (req.body.name ?? '').trim();
    if (!name) {
        req.success = false;
        req.reason  = 'EMPTY';
        return next();
    }

    const pool = db_pool.promise();
    try {
        const [result] = await pool.query(
            "INSERT INTO categories (user_id, name) VALUES (?, ?)",
            [req.user_id, name]
        );

        req.success  = result.affectedRows > 0;
        req.insertId = result.insertId;     // ה-id של הקטגוריה החדשה
        req.newName  = name;
    } catch (err) {
        console.log("שגיאה בהוספת קטגוריה:", err);
        req.success = false;
        req.reason  = 'DB';
    }

    next();
}



async function EditCategory(req, res, next) {

    next();
}

async function ShowCategory(req, res, next) {


    next();
}


async function DeleteCategory(req, res, next) {

    next();
}


module.exports = {
    AddCategory,
    EditCategory,
    ShowCategory,
    DeleteCategory
};
