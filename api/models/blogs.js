const mongoose = require('mongoose');

const blogSchema= mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    title: String,
    content: String
});


module.exports = mongoose.model('blogs',blogSchema);



















