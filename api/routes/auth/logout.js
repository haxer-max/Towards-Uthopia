const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

const User = require("../../models/users");

router.get("/",(req,res)=>{
    res.clearCookie('myGreatBlog_auth_token_bearee');
    res.redirect('../../');
});


module.exports = router;