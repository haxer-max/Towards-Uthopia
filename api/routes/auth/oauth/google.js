const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;
const passport = require("passport");

const User = require("../../../models/users");

router.get('/',
  passport.authenticate('google', {session: false, scope: ['profile', 'email'] }),
  
);

router.get('/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res)=>{
    // Successful authentication, redirect home.
    console.log("2"+ req.user)
    const payload={id: req.user._id, name: req.user.name}
    const token= jwt.sign(payload,process.env.SECRET,(err,token)=>{
        console.log(token);
        res.cookie('myGreatBlog_auth_token_bearee', token);
        res.redirect('/');
    })
  }
);
module.exports = router;
