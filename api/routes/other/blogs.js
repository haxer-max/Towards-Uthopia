const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const upload=require('../../config/multerconfig')();

//custom files
const commonauth= require('../../config/auth_middleware').commonauth

const Blog = require("../../models/blogs");

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
    console.log(req.file);
    console.log("HEY")
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        author: req.userid,
        //blogimage: '/uploads/'+req.file.filename,
    });

    if(req.file) blog.blogimage='/uploads/'+req.file.filename;

    try{
        result=await blog.save()
        console.log(result);
        res.redirect('/blogs/'+result._id)
    }
    catch(err) {
        res.send(err);
    }
});

/*
{ fieldname: 'blogimage',
  originalname: '5e32f2a324306a19834af322.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '79b5aab14e79cad78776c5c0ee1583e4',
  path: 'uploads\\79b5aab14e79cad78776c5c0ee1583e4',
  size: 35859 }
*/


router.get("/:ID", async(req, res) => {
    try{
        blog= await Blog.findById(req.params.ID).populate('author').exec()
        
        console.log(blog)
        blog.UserIsAuth=req.UserIsAuth;
        blog.name= req.theUserName;
        blog.userid=req.userid
        res.render('blog',blog);
    }catch(err){
        res.send(err);
    }
});

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
