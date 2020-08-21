const express = require('express');
const router = express.Router();

const Blogs = require('../models/blogs');

router.get("/a", (req, res) => {
  Blogs
    .find({})
    .exec()
    .then((blog) => {
      res.send(blog);
    });
});




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
