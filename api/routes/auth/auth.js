const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;

const User = require("../../models/users");

const registerroute=require('./register');

const loginroute=require('./login');
const logoutroute=require('./logout');

const googleroute=require('./oauth/google');


router.use("/register", registerroute)

router.use("/login", loginroute)
router.use("/logout", logoutroute)

router.use("/google", googleroute)



module.exports = router;
