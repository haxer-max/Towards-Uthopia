const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now() + file.originalname);
    }, 
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*10,
    },
    fileFilter:fileFilter,
});

//custom files
const commonauth= require('../../config/auth_middleware').commonauth

const Blog = require("../../models/blogs");

router.get("/a", (req, res) => {
    
    Blog.find({})
        .select('_id title content')
        .populate('author')
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});


router.get("/new_blog",commonauth,(req,res)=>{
    res.render("newblog",{  UserIsAuth:req.UserIsAuth, name: req.theUserName, userid:req.userid });
})

router.post("/new_blog", commonauth, upload.single('blogimage'), (req, res) => {
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

    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect('/blogs/'+result._id)
        })
        .catch((result) => {
            console.log(result);
        });
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


router.get("/:ID", (req, res) => {
    Blog.findById(req.params.ID)
        .populate('author')
        .exec()
        .then((blog) => {
            console.log(blog)
            blog.UserIsAuth=req.UserIsAuth;
            blog.name= req.theUserName;
            blog.userid=req.userid
            res.render('blog',blog);
        });
});

router.get("/:ID/edit", (req, res) => {
    Blog.findById(req.params.ID)
        .populate('author')
        .exec()
        .then((blog) => {
            blog.UserIsAuth=req.UserIsAuth;
            blog.name= req.theUserName; 
            blog.userid=req.userid;           
            res.render('editblog',blog);
        })
        .catch((result) => {
            res.send(result)
            console.log(result);
        });
});

router.patch("/:ID/edit", (req, res) => {
    Blog.findById(req.params.ID)
        .exec()
        .then((blog) => {
            blog.title= req.body.title;
            blog.content=req.body.content;
            return blog.save();
        })
        .then((result) => {
            console.log(result);
        })
        .catch((result) => {
            console.log(result);
        });
});


router.get("/:ID/delete_blog", (req, res) => {
    Blog.findByIdAndRemove(req.params.ID)
        .exec()
        .then((result) => {
            //res.send(result);
            console.log(result);
            res.redirect('/')
        })
        .catch((result) => {
            res.send(result);
            console.log(result);
        });
});

module.exports = router;
