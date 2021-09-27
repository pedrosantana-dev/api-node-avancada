const mongoose = require('mongoose');

const connectDatabase = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
}

module.exports = connectDatabase;