const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;

const User = require("../../models/users");

router.get("/",(req,res)=>{
    res.render('register');
})

router.post("/", (req, res) => {
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


module.exports = router;