
require('dotenv').config();
const Sequelize = require('sequelize');

// criando conexao
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
});

// testando conexao
try {

    sequelize.authenticate();

} catch (err) {
    console.log(err);
}

module.exports = sequelize;

