const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;

const User = require("../models/users");

router.get("/a", (req, res) => {
    User.find({})
        .exec()
        .then((blog) => {
            res.send(blog);
        });
});

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((existinguser) => {
            console.log(existinguser);
            if (existinguser) {
                res.status(409).send({"error":"user exist"});
                //throw(JSON.parse('{"error":"user exist"}'));
            } else {
                return bcrypt.hash(req.body.password, saltRounds);
            }
        })
        .then((hash) => {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
            });
            return user.save();
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log("BRUHBRUH");
            res.status(500).send(err);
        });
});

router.delete("/:ID/delete_blog", (req, res) => {
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

router.get("/login",(req,res)=>{

    res.render('login');



})

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                res.status(400);
                res.send("register first");
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((match) => {
                        console.log(user);

                        if (match) {
                            const payload={id: user._id}
                            const token= jwt.sign(payload,process.env.SECRET)
                            res.setHeader('Authorization', 'Bearer '+ token);
                            res.redirect('http://localhost:3000/protec');
                        } else {
                            res.send("nah");
                        }
                    })
                    /*.then((result) => {
                    //console.log(res);
                    res.send("user added");
                })*/
                    .catch((err) => {
                        res.send(err);
                    });
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
