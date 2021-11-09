const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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
        required: [true, "Por favor forneça o email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Por favor insira uma senha"],
        // select: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Mostrar Propriedade Virtual Do Nome de Exibição
UserSchema.virtual('full_name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

// Mongoose Middleware para Encrypt Password
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Mongoose Middleware para comparar o password
UserSchema.methods.comparePassword = function (candidatePassword, callback) {    
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        } else {
            callback(null, isMatch);
        }
        
    });
};

module.exports = mongoose.model('User', UserSchema);