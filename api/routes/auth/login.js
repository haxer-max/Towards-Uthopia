const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

const User = require("../../models/users");



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
                            //res.setHeader('Authorization', 'Bearer '+ token);
                            res.redirect('http://localhost:3000/protec');
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