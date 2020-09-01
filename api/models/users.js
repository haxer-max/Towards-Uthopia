const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.ObjectId,
    
    email: {
        type: String,
        //require: true,
        //unique: true,
        //match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        //max:255,

    },
    
    password: {
        type: String,
        //require: true,
    },

    googleId: {
        type: String,
        //require: true,
    },


    name: {
        type: String,
        //require: true,
    },     
    //userBlogs:[Schema.Types.ObjectId],

});

module.exports = mongoose.model("users", userSchema);
