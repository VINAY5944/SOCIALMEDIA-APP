const jwt=require('jsonwebtoken')
const JWT_SECRET="12345";

const protect=(req,res,next)=>{
    let token ;

if(req.headers.authorization&& req.headers.authorization.startsWith("Bearer")){
    try {
        token =req.headers.authorization.split(" ")[1];
        jwt.verify(token,JWT_SECRET);
        next()
    } catch (error) {
        res.status(401).send("no token")
        console.log(`there is an error in the token validation middleware and the error is ${error}`);
    }
}
if (!token){

    res.status(401).send("no token avaliable")
}

}
module.exports=protect