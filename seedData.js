const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const db = require('./config/db');
const faker = require('faker');

// Carregar variáveis ENV
dotenv.config({ path: './config/config.env' });

// Carregar models
const Product = require('./models/Product');

// Conectar ao MongoDB
db().then();

// Ler os arquivos JSON
const products = fs.readFileSync(`${__dirname}/_seedData/products.json`, 'utf-8');


// Importar dados de amostra
const importData = async () => {
    try {
        await Product.create(products);
        console.log('Dados importados com sucesso'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const fakerDataGenerator = async () => {
    try {
        for (let i = 0; i < 50; i++) {
            await Product.create({
                "title": faker.commerce.productName(),
                "price": faker.commerce.price(),
                "description": faker.commerce.productDescription()
            });
        }
        console.log('Dados gerados com sucesso'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

// Delete os dados do DB
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Dados deletados com sucesso'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    importData().then();
} else if (process.argv[2] === '-f') {
    fakerDataGenerator().then();
} else if (process.argv[2] === '-d') {
    deleteData().then();
}