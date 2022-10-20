
const { Sequelize, DataTypes } = require('sequelize'); 
const sequelize = require('../config/db');
const Empresa = require('./Empresa');

const Veiculos = sequelize.define('veiculos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    renavan: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    placaVeiculo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    veiculoImgPath: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'veiculos',
    timestamps: false
})

Empresa.hasMany(Veiculos, {
    foreignKey: 'empresaid'
});
Veiculos.belongsTo(Empresa, {
    foreignKey: 'empresaid'
});

Veiculos.sync();

module.exports = Veiculos;