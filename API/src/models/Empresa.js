
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Empresa = sequelize.define('empresa', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cnpj: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nomeEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailContato: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    empresaImgPath: {
        type: DataTypes.STRING
    }

}, {
    timestamps: false,
    tableName: 'empresa'
});

Empresa.sync();

module.exports = Empresa;