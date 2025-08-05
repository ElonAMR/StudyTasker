const md5 = require('md5');

async function CheckLogin(req, res,next) {
    let uname   = (req.body.uname  !== undefined) ? addSlashes(req.body.uname     ) : "";
    let passwd  = (req.body.passwd !== undefined) ?            req.body.passwd      : "";
    let enc_pass = md5("A"+passwd);
    let Query = `SELECT * FROM users WHERE uname = '${uname}' AND passwd = '${enc_pass}'`;

    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(Query); // objects in arr and result from Query in index [0]

        if (rows.length > 0) {
            req.validUser = true;
            req.user = rows[0];
        } else {
            req.validUser = false;
        }

    } catch (err) {
        console.log("שגיאה בבדיקת התחברות:", err);
        req.validUser = false;
    }
    next();
}


module.exports = {
    CheckLogin,
};