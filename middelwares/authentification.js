var jwt= require('jsonwebtoken');
module.exports={
    validateUser:function(req,res,next){
        jwt.verify(req.headers['x-access-token'],//x-access variable snaatou bech n7ot feha token user
        req.app.get('secretKey'),function(err,decoded){
            if(err){
                res.json({
                    status:"error",
                    message:err.message,
                    data:null
                })
            }
            else{
                //add user id to request
                req.userId=decoded.id;
                req.user=decoded.user
                next();
            }
        })
    }
}




