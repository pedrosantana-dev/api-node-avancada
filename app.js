const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

// Carregar o arquivo config.env
dotenv.config({ path: './config/config.env' });

// Conectar ao Database
db().then();


// Criar Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Definir o caminho da pasta estática
app.use(express.static(path.join(__dirname, 'public')));

// Carrega Rotas
const productRoute = require('./routes/products');
const  userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Usa Rotas
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);


// Define a variável PORT para armazenar o número da porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


