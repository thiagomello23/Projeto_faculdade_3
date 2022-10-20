
const express = require('express');
const router = express.Router();
const Veiculos = require('../models/Veiculos');
const messageHandler = require('../helper/messageHandler');
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');
const checkToken = require('../middlewares/checkToken')

// Middleware para upload
const configStorage = require('../middlewares/uploadImage');
const Funcionarios = require('../models/Funcionario');
const EventosVeiculos = require('../models/EventosVeiculos');
const upload = configStorage('veiculos');

// Puxa todos os veiculos de um usuario em formato de paginacao
router.get('/veiculos/all', checkToken, async (req, res) => {

    // Pegar os dados do ID da empresa via JWT
    const token = req.headers['authorization'];
    const data = jwt.decode(token);

    // Paginacao
    // const limit = req.query.limit;
    // const offset = req.query.offset;

    if(!data.id) return res.status(500).json(messageHandler("Dados invalidos!"))

    const veiculosDados = await Veiculos.findAndCountAll({
        where: {
            empresaid: data.id
        },
        // limit: limit,
        // offset: offset
    })
    
    if(!veiculosDados || veiculosDados.length == 0) return res.status(500).json(messageHandler("Voce nao possui nenhum veiculo cadastrado!"));

    res.status(200).json(veiculosDados);

});

// Puxa todos os dados de um veiculo em especifico, seu funcionario atrelado e 5 eventos
router.get('/veiculos/', checkToken, async (req, res) => {

    // Id do veiculo e id da empresa
    const veiculoId = req.query.veiculoId;
    const empresaId = req.query.empresaId;

    if(!veiculoId || !empresaId) return res.status(500).json(messageHandler("Dados invalidos!"))

    const veiculoData = await Veiculos.findOne({
        where: {
            [Op.and]: [
                {id: veiculoId},
                {empresaid: empresaId}
            ]
        },
        include: [Funcionarios, EventosVeiculos]
    })

    if(!veiculoData) return res.status(500).json(messageHandler("Veiculo nao encontrado!"))

    res.status(200).json(veiculoData);

});

// cadastra um novo veiculo
router.post('/veiculos/', upload.single('veiculoImg'), checkToken, async (req, res) => {

    // renavan e placa sao unicos
    let imgName;
    const { modelo, renavan, placaVeiculo} = req.body;
    
    // Validar todos os dados
    if(req.file) {
        imgName = req.file.filename;
    }

    // validacao minima de dados
    if(!modelo || !renavan || !placaVeiculo) return res.status(500).json(messageHandler("Necessario preencher todos os dados!"))

    // Puxa os dados
    const dataValidation = await Veiculos.findOne({
        where: {
            [Op.or]: [
                {renavan: renavan},
                {placaVeiculo: placaVeiculo}
            ]
        }
    })

    // Caso haja dados
    if(dataValidation) {

        if(dataValidation.renavan == renavan) return res.status(500).json(messageHandler("Renavam ja cadastrado!"))

        if(dataValidation.placaVeiculo == placaVeiculo) return res.status(500).json(messageHandler("Placa de veiculo ja cadastrada!"))

    }

    // Pegar os dados do token
    const secret = process.env.JWT_SECRET;

    const token = req.headers['authorization'];

    const data = jwt.decode(token, secret);

    // Inserir no banco 
    await Veiculos.create({
        modelo: modelo,
        renavan: renavan,
        placaVeiculo: placaVeiculo,
        empresaid: data.id,
        veiculoImgPath: imgName ? imgName : ''
    })

    // Retornar resposta
    res.status(200).json(messageHandler(
        "Veiculo cadastrado com sucesso!",
        false
    ))

});

// atualiza um veiculo
router.put('/veiculos/:veiculoId/', (req, res) => {



});

// deleta um veiculo
router.delete('/veiculos/:veiculoId', checkToken, async (req, res) => {

    const veiculoId = req.params.veiculoId;

    if(!veiculoId) return res.status(500).json(messageHandler("Dados invalidos!"));

    await Veiculos.destroy({
        where: {
            id: veiculoId
        }
    })

    res.status(200).json(messageHandler(
        "Veiculo deletado com sucesso!",
        false
    ))

});

module.exports = router;