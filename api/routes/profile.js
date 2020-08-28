const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/users");

router.get("/a", (req, res) => {
    User.find({})
        .select('_id title content')
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});

router.get("/:ID", (req, res) => {
    User.findById(req.params.ID)
        .exec()
        .then((blog) => {

            res.send(blog);
        
        });
});

router.delete("/:ID/delete", (req, res) => {
    User.findByIdAndRemove(req.params.ID)
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


router.post("/new_blog", (req, res) => {
    const blog = new User({
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
    User.findById(req.params.ID)
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



router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
