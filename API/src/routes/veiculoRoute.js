
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

    if(!data.id) return res.status(500).json(messageHandler("Dados invalidos!"))

    const veiculosDados = await Veiculos.findAll({
        where: {
            empresaid: data.id
        }
    })
    
    if(!veiculosDados || veiculosDados.length == 0) return res.status(500).json(messageHandler("Voce não possui nenhum veiculo cadastrado!"));

    res.status(200).json(veiculosDados);

});

// Puxa todos os dados de um veiculo em especifico
router.get('/veiculos/:veiculoId', checkToken, async (req, res) => {

    // Id do veiculo e id da empresa
    const veiculoId = req.params.veiculoId;

    if(!veiculoId) return res.status(500).json(messageHandler("Dados invalidos!"))

    // Preciso fazer 2 includes
    const veiculoData = await Veiculos.findOne({
        where: {
            id: veiculoId,
        },
        include: [
            Funcionarios,
            EventosVeiculos
        ],
    })

    if(!veiculoData) return res.status(500).json(messageHandler("Veiculo nao encontrado!"))

    res.status(200).json(veiculoData);

});

// cadastra um novo veiculo
router.post('/veiculos/', upload.single('veiculoImg'), checkToken, async (req, res) => {

    // renavan e placa sao unicos
    let imgName;
    const { modelo, renavan, placaVeiculo } = req.body;

    // Validar todos os dados
    if(req.file) {
        imgName = req.file.filename;
    }

    // DEBUG
    console.log(req.body);
    console.log(req.file);

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
router.put('/veiculos/', upload.single('veiculoImg'), checkToken, async (req, res) => {

    let imgName;
    const { modelo, renavan, placaVeiculo, veiculoId } = req.body;

    // Validacao minima de dados
    if(!modelo || !renavan || !placaVeiculo || !veiculoId) 
    return res.status(500).json(messageHandler("Necessario preencher todos os dados!"));

    // Valida imagem
    if(req.file) {
        imgName = req.file.filename;
    }

    // Puxa os dados
    const veiculoDataAtual = await Veiculos.findByPk(veiculoId);

    if(!veiculoDataAtual) return res.status(500).json(messageHandler("Dados invalidos!"))

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

        if(dataValidation.renavan == renavan && veiculoDataAtual.renavan != dataValidation.renavan) 
        return res.status(500).json(messageHandler("Renavam ja cadastrado!"))

        if(dataValidation.placaVeiculo == placaVeiculo && veiculoDataAtual.placaVeiculo != dataValidation.placaVeiculo) 
        return res.status(500).json(messageHandler("Placa de veiculo ja cadastrada!"))

    }

    // Atualizar no banco de dados
    await Veiculos.update({
        modelo: modelo,
        renavan: renavan,
        placaVeiculo: placaVeiculo,
        veiculoImgPath: imgName
    }, {
        where: {
            id: veiculoId
        }
    })
    
    // Retorno a resposta
    res.status(200).json(messageHandler(
        'Dados atualizados com sucesso!',
        false
    ))


});

module.exports = router;