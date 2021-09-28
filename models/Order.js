const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: [ true, "Por favor insira um preço"]
    },
    paid: {
        type: Boolean,
        default: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    dataOfOrder: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('order', OrderSchema);