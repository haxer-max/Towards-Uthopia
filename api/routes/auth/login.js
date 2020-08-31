const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

const User = require("../../models/users");

router.get("/",(req,res)=>{
    res.render('login',{  UserIsAuth:req.UserIsAuth, name: req.theUserName });
})

router.post("/", (req, res) => {
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
                            const payload={id: user._id, name:user.name}
                            const token= jwt.sign(payload,process.env.SECRET,(err,token)=>{
                                console.log(token);
                                res.cookie('myGreatBlog_auth_token_bearee', token);
                                //res.setHeader('Authorization', 'Bearer '+ token);
                                res.redirect('/');
                            })

                        } 
                        else {
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