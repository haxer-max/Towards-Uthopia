const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;

const User = require("../../../models/users");

app.get('/auth/login/google',
  passport.authenticate('google', {session: false, scope: ['profile', 'email'] }),
  
  );

app.get('/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res)=>{
    // Successful authentication, redirect home.
    console.log("2")
    res.redirect('/protecg');
  }
);
module.exports = router;
