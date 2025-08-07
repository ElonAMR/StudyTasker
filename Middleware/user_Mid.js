const md5 = require('md5');

async function isLogged(req, res,next){
    const jwtToken = req.cookies.ImLoggedToYoman;
    let user_id=-1;
    if (jwtToken !== "") {
        jwt.verify(jwtToken, 'myPrivateKey', async (err, decodedToken) => {
            if (err) {
                console.log("err=",err);
            } else {
                let data = decodedToken.data;
                user_id = data.split(",")[0];
                req.user_id=user_id;
            }
        })
    }
    if(user_id < 0)
        res.redirect("/");

    next();
}


async function CheckLogin(req, res,next) {
    let uname   = (req.body.uname  !== undefined) ? addSlashes(req.body.uname     ) : "";
    let passwd  = (req.body.passwd !== undefined) ? req.body.passwd  : "";
    let Query = `SELECT * FROM users WHERE username = '${uname}' AND password = '${passwd}'`;

    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    if(rows.length > 0){
        req.validUser = true;
        let val = `${rows[0].id},${rows[0].name}`;
        let token = jwt.sign(
            {data: val},
            'myPrivateKey',
            { expiresIn: 31*24*60*60 // in sec
            });
        res.cookie("ImLoggedToYoman", token, {
            maxAge: 31*24*60*60 * 1000, // 3hrs in ms
        });

    }else {
        req.validUser = false;
    }
    next();
}


module.exports = {
    CheckLogin,
    isLogged,
}