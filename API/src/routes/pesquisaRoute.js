
const express = require('express');
const { Op } = require('sequelize');
const messageHandler = require('../helper/messageHandler');
const router = express.Router();
const Veiculos = require('../models/Veiculos');
const checkToken = require("../middlewares/checkToken");
const jwt = require('jsonwebtoken');

// Pesquisa por um modelo de veiculo em especifico
router.post('/pesquisa', checkToken, async (req, res) => {

    const { pesquisa } = req.body;

    // Pegar os dados do ID da empresa via JWT
    const token = req.headers['authorization'];
    const tokenData = jwt.decode(token);

    const veiculoData = await Veiculos.findAll({
        where: {
            [Op.and]: [
                {modelo: {
                    [Op.like]: `%${pesquisa}%`
                }}, 
                {empresaid: tokenData.id}
            ]
        }
    })

    if(!veiculoData || veiculoData.length == 0) return res.status(500).json(messageHandler('Nenhum veiculo encontrado!'))

    res.status(200).json(veiculoData);

});

module.exports = router;