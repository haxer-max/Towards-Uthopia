const express = require("express");
const router = express.Router();

const User = require("../../models/users");

//

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



module.exports = router;
