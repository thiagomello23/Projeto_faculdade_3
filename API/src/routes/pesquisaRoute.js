
const express = require('express');
const { Op } = require('sequelize');
const messageHandler = require('../helper/messageHandler');
const router = express.Router();
const Veiculos = require('../models/Veiculos');

// Pesquisa por um modelo de veiculo em especifico
router.post('/pesquisa', async (req, res) => {

    const { pesquisa, userid } = req.body;

    const veiculoData = await Veiculos.findAll({
        where: {
            modelo: {
                [Op.like]: `%${pesquisa}%`
            }
        }
    })

    if(!veiculoData || veiculoData.length == 0) return res.status(500).json(messageHandler('Veiculo nao encontrado!'))

    res.status(200).json(veiculoData);

});

module.exports = router;