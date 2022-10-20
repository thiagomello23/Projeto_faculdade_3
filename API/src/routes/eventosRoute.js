
const express = require('express');
const router = express.Router();
const messageHandler = require('../helper/messageHandler');
const EventosVeiculos = require('../models/EventosVeiculos');

// Cadastrar um evento
router.post('/eventos', async (req, res) => {

    const tiposPermitidos = ['Acidente', 'Reparo'];
    const { nomeEvento, tipo, descricao, veiculoId } = req.body;

    // Data (data gerada do lado do servidor)
    const data = new Date().toISOString();

    // Validacao minima de dados
    if(!nomeEvento || !tipo || !data || !veiculoId)
    return res.status(500).json(messageHandler(
        'Por favor, preencha todos os campos!'
    ))

    // Validacao do tipo
    const validandoTipos = tiposPermitidos.find( tipoPermitido => {
        if(tipoPermitido == tipo) {
            return tipo;
        }
    })

    if(!validandoTipos) 
    return res.status(500).json(messageHandler(
        'Tipo de evento invalido!'
    ))

    // Inserir na tabela
    await EventosVeiculos.create({
        nomeEvento: nomeEvento,
        tipo: tipo,
        data: data,
        descricao: descricao ? descricao : '',
        veiculoid: veiculoId
    })

    // Retornar resposta
    res.status(200).json(messageHandler(
        'Evento cadastrado com sucesso!',
        false
    ))

})

// Puxar todos os eventos (provavelmente pagination)
router.get('/eventos/veiculo/:veiculoId', async (req, res) => {

    const veiculoId = req.params.veiculoId;

    if(!veiculoId)
    return res.status(500).json(messageHandler(
        'Houve um erro, tente novamente!'
    ))

    // Puxa os dados
    const data = await EventosVeiculos.findAll({
        where: {
            veiculoid: veiculoId
        }
    })

    if(!data || data.length == 0) 
    return res.status(500).json(messageHandler(
        'Nenhum dado encontrado!'
    ))

    // Retorna os dados
    res.status(200).json(data);

});

// Puxar um evento em especifico
router.get('/eventos/:eventoId', async (req, res) => {

    const eventoId = req.params.eventoId;

    if(!eventoId)
    return res.status(500).json(messageHandler(
        'Houve um erro, tente novamente!'
    ))
    
    // Pega os dados com base nesse evento
    const data = await EventosVeiculos.findOne({
        where: {
            id: eventoId
        }
    })

    // Valida os dados
    if(!data)
    return res.status(500).json(messageHandler(
        'Evento nao encontrado!'
    ))

    // Retorna os dados
    res.status(200).json(data);
    
})

// Atualizar um evento
router.put('/eventos');

// Deletar um evento especifico
router.delete('/eventos/:eventoId');

module.exports = router;