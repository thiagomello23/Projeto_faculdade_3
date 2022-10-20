
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Veiculos = require('./Veiculos');

const Funcionarios = sequelize.define('funcionarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    identificadorEmpresa: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'funcionarios',
    timestamps: false
})

Veiculos.hasOne(Funcionarios, {
    foreignKey: {
        name: 'veiculoid'
    }
})

Funcionarios.belongsTo(Veiculos, {
    foreignKey: {
        name: 'veiculoid'
    }
})

Funcionarios.sync();

module.exports = Funcionarios;
