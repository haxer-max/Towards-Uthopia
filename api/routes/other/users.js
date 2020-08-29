const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')

const User = require("../../models/users");

//

router.get("/aa", (req, res) => {
    res.redirect('../a')
});

router.get("/a", (req, res) => {
    User.find({})
        .exec()
        .then((blog) => {
            res.send(blog);
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
