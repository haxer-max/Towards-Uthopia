const jwt=require('jsonwebtoken');

commonauth= (req,res,next)=>{
    if(req.UserIsAuth) next();
    else res.redirect(process.env.DOMAIN+'/auth/login')  //req.baseUrl
}




module.exports ={
    commonauth,
    userspecificauth:1,
    blogspecific:1
}