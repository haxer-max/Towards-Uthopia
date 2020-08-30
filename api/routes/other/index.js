const express = require('express');
const router = express.Router();
const passport = require('passport')

const commonauth= require('../../config/auth_middleware').commonauth

const User = require("../../models/users");
const Blog = require("../../models/blogs");

const usersRouter = require("./users");
const blogsRouter = require("./blogs");
const profileRouter = require("./profile");


/* GET home page. */
router.get('/', function(req, res, next) {
    Blog.find({})
    .exec()
    .then((blogs) => {
        //res.send(blogs);
        res.render('index', { blogs : blogs });
    });
    
});
router.use("/users", usersRouter);
router.use("/blogs", blogsRouter);
router.use("/profile", profileRouter);
router.use("/auth",require('../auth/auth'))










router.get('/protec', 
    passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        console.log(req.isAuthenticated())
        res.send(req.user);
    }
)
router.get('/p', commonauth,(req,res)=>{
    //console.log(req);
    console.log(req.userid)
    res.send(req.userid)
})

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
