const jwt=require('jsonwebtoken');

commonauth= (req,res,next)=>{
    token=req.cookies.myGreatBlog_auth_token_bearee
    jwt.verify(token, process.env.SECRET,(err,decoded)=>{
        if(err) 
        {
            console.log(token)
            console.log(err)
            res.redirect(process.env.DOMAIN+'/auth/login')  //req.baseUrl
        }
        else{
            req.userid=decoded.id
            req.UserIsAuth=true
            next()
        }
    })
}




module.exports ={
    commonauth,
    userspecificauth:1,
    blogspecific:1
}