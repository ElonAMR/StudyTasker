// Middleware להוספת משימה
async function AddTask(req, res, next) {
    // שליפת פרטי המשתמש המחובר
    let user_id = (req.user && req.user.id) ? req.user.id : 0;
    // שליפת שדות מהבקשה
    let title       = (req.body.title       !== undefined) ? (req.body.title)       : "";
    let description = (req.body.description !== undefined) ? (req.body.description) : "";
    let due_date    = (req.body.due_date    !== undefined) ? (req.body.due_date)    : "";
    let category_id = (req.body.category_id !== undefined) ? (req.body.category_id) : null;

    // שאילתה להוספה
    let Query = `
        INSERT INTO tasks (user_id, category_id, title, description, due_date, is_done)
        VALUES ('${user_id}', ${category_id ? `'${category_id}'` : 'NULL'}, '${title}', '${description}', '${due_date}', 0)
    `;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
        req.taskAdded = true;
    } catch (err) {
        console.log("❌ שגיאה בהוספת משימה:", err);
        req.taskAdded = false;
    }

    next();
}

// Middleware להצגת כל המשימות
async function GetAllTasks(req, res, next) { ... }

// Middleware למחיקת משימה
async function DeleteTask(req, res, next) { ... }

// Middleware לעריכת משימה
async function EditTask(req, res, next) { ... }

module.exports = {
    AddTask,
    GetAllTasks,
    DeleteTask,
    EditTask
};
