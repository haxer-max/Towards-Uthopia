const express = require('express');
const router = express.Router();

const commonauth= require('../../config/auth_middleware').commonauth

const Blog = require("../../models/blogs");

const usersRouter = require("./users");
const blogsRouter = require("./blogs");
const profileRouter = require("./profile");
const authRouter = require('../auth/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    Blog.find({})
    .exec()
    .then((blogs) => {
        res.render('index', { blogs : blogs, UserIsAuth:req.UserIsAuth, name: req.theUserName });
    });
});

router.use("/users", usersRouter);

router.use("/blogs", blogsRouter);

router.use("/profile", profileRouter);

router.use("/auth",authRouter)

//
router.get('/p', commonauth,(req,res)=>{
    //console.log(req);
    console.log(req.userid)
    res.send(req.userid)
})

module.exports = router;
