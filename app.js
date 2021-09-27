const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

// Carregar o arquivo config.env
dotenv.config({ path: './config/config.env' });


// Conectar ao Database
db();


// Criar Express App
const app = express();

// Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

// Definir o caminho da pasta estática
app.use(express.static(path.join(__dirname, 'public')));

// Define a variável PORT para armazenar o número da porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

