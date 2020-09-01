const jwt=require('jsonwebtoken');

commonauth= (req,res,next)=>{
    if(req.UserIsAuth) next();
    else res.redirect(process.env.DOMAIN+'/auth/login')  //req.baseUrl
}

userspecificauth=(req,res,next)=>{
    console.log(req.userid)
    if(req.userid === req.params.ID) next();
    else res.redirect(process.env.DOMAIN+'/')  //req.baseUrl
}

blogspecific=(req,res,next)=>{
    //console.log(req.userid)
    if(req.userid === req.params.ID) next();
    else res.redirect(process.env.DOMAIN+'/')  //req.baseUrl
}

module.exports ={
    commonauth,
    userspecificauth,
    blogspecific
}