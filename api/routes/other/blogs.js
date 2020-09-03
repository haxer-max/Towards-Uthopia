const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const upload=require('../../config/multerconfig')();

//custom files
const commonauth= require('../../config/auth_middleware').commonauth

const Blog = require("../../models/blogs");
const Comment = require("../../models/comments");


//

//
router.get("/a", async(req, res) => {
    try{
        blog=await Blog.find({}).populate('author').exec()
        res.send(blog);
    }
    catch(err)
    {
        res.send(err);
    }
});


router.get("/new_blog",commonauth,(req,res)=>{
    res.render("newblog",{  UserIsAuth:req.UserIsAuth, name: req.theUserName, userid:req.userid });
})

router.post("/new_blog", commonauth, upload.single('blogimage'), async(req, res) => {
    try{
        console.log(req.file);
        const blog = new Blog({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            content: req.body.content,
            author: req.userid,
        });

        if(req.file) blog.blogimage='/uploads/'+req.file.filename;
    
        result=await blog.save()
        console.log(result);
        res.redirect('/blogs/'+result._id)
    }
    catch(err) {
        res.send(err);
    }
});


router.get("/:ID", async(req, res) => {
    try{
        const [blog,comments]= await Promise.all([
            Blog.findById(req.params.ID).populate('author').exec(),
            Comment.find({forblog:req.params.ID}).populate('writer').exec()
        ])
        blog.UserIsAuth=req.UserIsAuth;
        blog.name= req.theUserName;
        blog.userid=req.userid;
        blog.comments=comments
        //console.log(blog)
        //console.log(comments)
        res.render('blog',blog);
    }catch(err){
        res.send(err);
    }
});

router.post("/:ID/new_comment", async(req, res) => {
    try{
        console.log("COMMENT  ")
        const comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            content: req.body.content,
            writer: req.userid,
            forblog: req.params.ID,
        });
        console.log(comment);
        await comment.save();
        res.redirect('/blogs/'+req.params.ID);
    }catch(err){
        res.send(err);
    }
});
/*
router.post("/:ID/delete_comment/:commentid", async(req, res) => {
    try{
        const comment=await Comment.findById(req.params.commentid).exec()
        if(comment.writer==req.userid|| comment.forblog.author== req.userid) 
        {
            await blog.remove()
        }
        res.redirect('../../')
        console.log(comment);
        await comment.save();
        res.redirect('/blogs/'+req.params.ID);
    }catch(err){
        res.send(err);
    }
});
*/
router.get("/:ID/edit", async(req, res) => {
    try{
        blog=await Blog.findById(req.params.ID).populate('author').exec()
        if(blog.author===req.userid){
            blog.name= req.theUserName; 
            blog.userid=req.userid;           
            res.render('editblog',blog);
        }
        else{
            res.redirect('../../')
        }
    }catch(err) {
        res.send(result)
        console.log(result);
    }
});

router.patch("/:ID/edit", async(req, res) => {
    try{
        blog=await Blog.findById(req.params.ID).exec()
        if(blog.author===req.userid){
            
            blog.title= req.body.title;
            blog.content=req.body.content;
            await blog.save();
            res.redirect('/'+ req.params.ID)
        }
        else{
            res.redirect('/')
        }
    }
    catch(err){
        res.send(err);
    }
});


router.get("/:ID/delete_blog", async(req, res) => {
    try{    
        //await Blog.findByIdAndRemove(req.params.ID).exec()
        const blog=await Blog.findById(req.params.ID).exec()
        if(blog.author==req.userid) 
        {
            await blog.remove()
        }
        res.redirect('../../')
    } catch(err){
        res.send(err)
    }
});

module.exports = router;
