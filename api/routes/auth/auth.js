const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const saltRounds = 10;

const User = require("../../models/users");

const loginroute=require('./login');
const registerroute=require('./register');
const googleroute=require('./oauth/google');

router.use("/login", loginroute)
router.use("/register", registerroute)

router.use("/google", googleroute)



module.exports = router;
