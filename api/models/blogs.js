const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,

    title: {
        type: String,
        require: true,
        max:50,
    },

    content: {
        type: String,
        require: true,
        max:5000,
    },

    author: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },

    blogimage:{
        type: String
    }

});

module.exports = mongoose.model("blogs", blogSchema);
