const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment= require("../../models/comments");
router.get("/:ID/delete_comment", async(req, res) => {
    try{
        const comment=await Comment.findById(req.params.ID).populate('forblog').exec()
        console.log(comment.writer)
        console.log(req.userid)
        console.log(comment.forblog.author)
        if(comment.writer==req.userid || comment.forblog.author== req.userid) 
        {
            await comment.remove();
        }
        res.redirect('/blogs/'+comment.forblog._id+'/')
        
    }catch(err){
        res.send(err);
    }
});

module.exports=router;