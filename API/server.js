
// dotenv
require('dotenv').config();

// Imports 
const express = require('express');
const app = express();
const cors = require('cors');

const cadastradoRoute = require('./src/routes/cadastroRoute');
const loginRoute = require('./src/routes/loginRoute');
const veiculoRoute = require('./src/routes/veiculoRoute');
const pesquisaRoute = require('./src/routes/pesquisaRoute')
const funcionarioRoute = require('./src/routes/funcionarioRoute');
const eventosRoute = require('./src/routes/eventosRoute');

// Middlewares 
app.use(cors());

// {
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     origin: "*",
//     preflightContinue: true,
//     credentials: true
// }

app.use(express.json());

////////////////////
/////////// ROTAS
// Login/Logout
app.use('/', loginRoute);

// Cadastro
app.use('/', cadastradoRoute);

// Veiculos
app.use('/', veiculoRoute);

// Pesquisa
app.use('/', pesquisaRoute);

// Funcionarios
app.use('/', funcionarioRoute);

// Eventos Veiculo
app.use('/', eventosRoute);

// INICIALIZANDO SERVIDOR
app.listen(process.env.PORT, () => {

    console.log("Servidor rodando em http://localhost:3000");

});
