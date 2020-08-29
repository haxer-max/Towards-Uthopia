const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Blog = require("../../models/blogs");

router.get("/a", (req, res) => {
    Blog.find({})
        .select('_id title content')
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});

router.get("/:ID", (req, res) => {
    Blog.findById(req.params.ID)
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});


router.post("/new_blog", (req, res) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
    });

    blog.save()
        .then((result) => {
            console.log(result);
        })
        .catch((result) => {
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


router.delete("/:ID/delete_blog", (req, res) => {
    Blog.findByIdAndRemove(req.params.ID)
        .exec()
        .then((result) => {
            res.send(result);
            console.log(result);
        })
        .catch((result) => {
            res.send(result);
            console.log(result);
        });
});

router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
