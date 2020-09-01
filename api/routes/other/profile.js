const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt =require("bcrypt")
const authmiddle=require('../../config/auth_middleware')
const commonauth= authmiddle.commonauth
const userspecificauth= authmiddle.userspecificauth

const User = require("../../models/users");
const Blog = require("../../models/blogs");

const saltRounds=10

router.get("/a", (req, res) => {
    User.find({})
        .select('_id title content')
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});

router.get("/:ID",userspecificauth, (req, res) => {
    User.findById(req.params.ID)
        .exec()
        .then((user) => {
            user.UserIsAuth=req.UserIsAuth;
            user.name= req.theUserName;
            user.userid=req.userid
            //res.send(user);
            res.render('profile',user);
        });
});

router.get("/:ID/delete",userspecificauth, async (req, res) => {
    try{
        await Promise.all([
            User.findByIdAndRemove(req.params.ID).exec(),
            Blog.deleteMany({ author:req.params.ID }).exec()
        ])
        res.redirect('../../auth/logout')
    }catch(err){
        res.send(err);
    }
});


router.get("/:ID/edit",userspecificauth, async(req, res) => {
    res.render('editpassword',{id:req.params.ID, UserIsAuth:req.UserIsAuth, name: req.theUserName, userid:req.userid});
});


router.post("/:ID/edit",/*userspecificauth,*/ async(req, res) => {
    try{
        const user=await User.findById(req.params.ID).exec()
        //.then((user)=>console.log(user))
        hash =await bcrypt.hash(req.body.password, saltRounds);
        user.password= hash;
        //console.log(hash)
        await user.save();
        //console.log(a);
        res.redirect('../../')
    }
    catch(err) {
        res.send(err);
    }
});



router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
