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


    res.redirect('/p');
  }
);
module.exports = router;
