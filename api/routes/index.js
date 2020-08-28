const express = require('express');
const router = express.Router();
const passport = require('passport')
c=[]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protec', 
    passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        console.log(req.isAuthenticated())
        res.send(req.user);
    }
)

router.get('/get', 
    //Epassport.authenticate('google', {session: false,scope: ['profile', 'email']}),
    (req,res)=>{
        console.log(req.isAuthenticated())
        res.send(req.cookies);//.myGreatBlog);
    }
)

router.get('/set', 
    //Epassport.authenticate('google', {session: false,scope: ['profile', 'email']}),
    (req,res)=>{
        //console.log(req.isAuthenticated())
        res.cookie('myGreatBlog', 'hey there');
        res.send("done");
    }
)
module.exports = router;
