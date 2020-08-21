const mongoose = require('mongoose');

const blogSchema= mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title: String,
    content: String
});


module.exports = mongoose.model('blogs',blogSchema);



















