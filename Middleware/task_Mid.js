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



async function EditTask(req, res, next) {
    let task_id    = req.body.task_id     || "";
    let title      = req.body.title       || "";
    let description= req.body.description || "";
    let due_date   = req.body.due_date    || "";
    let is_done    = req.body.is_done     || 0;

    // בניית השאילתה (הגיוני שתשופר מחר)
    let Query = `
        UPDATE tasks
        SET title = '${addSlashes(title)}',
            description = '${addSlashes(description)}',
            due_date = '${addSlashes(due_date)}',
            is_done = '${is_done}'
        WHERE id = '${addSlashes(task_id)}'
    `;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
        req.taskEdited = true;
    } catch (err) {
        console.log("❌ שגיאה בעריכת משימה:", err);
        req.taskEdited = false;
    }

    next();
}

async function ShowTasks(req, res, next) {
    const user_id = req.user.id;
    const promisePool = db_pool.promise();

    try {
        const [rows] = await promisePool.query(`
            SELECT * FROM tasks
            WHERE user_id = '${(user_id)}'
            ORDER BY due_date ASC
        `);
        req.tasks = rows;
    } catch (err) {
        console.log("❌ שגיאה בשליפת משימות:", err);
        req.tasks = [];
    }

    next();
}


async function DeleteTask(req, res, next) {
    // let task_id = (req.body.task_id !== undefined) ? addSlashes(req.body.task_id) : "";
    // let user_id = req.user.id;
    //
    // let query = `DELETE FROM tasks WHERE id = '${task_id}' AND user_id = '${user_id}'`;
    // const promisePool = db_pool.promise();
    //
    // try {
    //     const [result] = await promisePool.query(query);
    //     req.deletionSuccess = result.affectedRows > 0;
    // } catch (err) {
    //     console.log("❌ שגיאה במחיקת משימה:", err);
    //     req.deletionSuccess = false;
    // }

    next();
}


module.exports = {
    AddTask,
    EditTask,
    ShowTasks,
    DeleteTask
};
