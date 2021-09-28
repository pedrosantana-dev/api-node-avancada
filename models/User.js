const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Por favor insira o primeiro nome"]
    },
    last_name: {
        type: String,
        required: [true, "Por favor insira o sobrenome"]
    },
    email: {
        type: String,
        required: [ true, "Por favor forneça o email"],
        unique: true
    },
    password: {
        type: String,
        require: [ true, "Por favor insira uma senha"],
        select: false
    }
});


module.exports = mongoose.model('user', UserSchema);