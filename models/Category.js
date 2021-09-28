const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [ true, "Por favor insira um título"]
    },
    description: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model('category', CategorySchema);