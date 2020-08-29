const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require("../../models/users");
const Blog = require("../../models/blogs");

/* GET home page. */
router.get('/', function(req, res, next) {
    Blog.find({})
    .exec()
    .then((blogs) => {
        //res.send(blogs);
        res.render('index', { blogs : blogs });
    });
    
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
