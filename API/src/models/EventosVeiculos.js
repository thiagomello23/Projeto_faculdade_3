
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Veiculos = require('./Veiculos');

// Deixar o usuario cadastrar a data
// data = dia/mes/ano
const EventosVeiculos = sequelize.define('eventosveiculos', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeEvento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    timestamps: false,
    tableName: 'eventosveiculos'
})

Veiculos.hasMany(EventosVeiculos, {
    foreignKey: {
        name: 'veiculoid'
    }
});
EventosVeiculos.belongsTo(Veiculos, {
    foreignKey: {
        name: 'veiculoid'
    }
});

EventosVeiculos.sync();

module.exports = EventosVeiculos;

