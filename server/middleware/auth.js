var jwt = require('jsonwebtoken');


class Auth{
    static Auth(req,res,next){
        console.log(req.headers.token);
        var decoded = jwt.verify(req.headers.token, 'thisissecret')
        console.log(decoded);
        if(decoded){
            next()
        }
        else{
            res
            .status(400)
            .json({
                error: "You are not authorized to access this API"
            })
        }
    }

}


module.exports = Auth