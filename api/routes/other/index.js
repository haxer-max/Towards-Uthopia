const express = require('express');
const router = express.Router();

const authmiddle=require('../../config/auth_middleware')
const commonauth= authmiddle.commonauth
const userspecificauth= authmiddle.userspecificauth


const Blog = require("../../models/blogs");

const usersRouter = require("./users");
const blogsRouter = require("./blogs");
const profileRouter = require("./profile");
const authRouter = require('../auth/auth');
const fs = require('fs')
const https=require('https')
saveImage=(url,path)=>{
    const localpath=fs.createWriteStream(path)
    const request=https.get(url,(res)=>{
        console.log(res)
        res.pipe(localpath)
    })
}


const url = 'https://i.insider.com/5e32f2a324306a19834af322?width=2400'
const path = './images/imagee.png'


/* GET home page. */
router.get('/', function(req, res, next) {
    //saveImage(url,path)
    Blog.find({})
    .populate('author')
    .exec()
    .then((blogs) => {
        res.render('index', { blogs : blogs, UserIsAuth:req.UserIsAuth, name: req.theUserName, userid:req.userid });
    });
});

router.use("/users", usersRouter);

router.use("/blogs", blogsRouter);

router.use("/profile" ,profileRouter);

router.use("/auth",authRouter)

//
router.get('/p', commonauth,(req,res)=>{
    //console.log(req);
    console.log(req.userid)
    res.send(req.userid)
})

module.exports = router;
