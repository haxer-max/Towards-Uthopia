const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,

    content: {
        type: String,
        require: true,
        max:255,
    },

    writer: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    forblog: {
        type: mongoose.Schema.ObjectId,
        ref: "blogs",
    },

});

module.exports = mongoose.model("comments", commentSchema);
