
const express = require('express');
const router = express.Router();
const messageHandler = require('../helper/messageHandler');
const Funcionarios = require('../models/Funcionario');

// Puxa os dados de um funcionario em especifico
router.get('/funcionarios/:funcionarioId', async (req, res) => {

    const funcionarioId = req.params.funcionarioId;

    // Validacao
    if(!funcionarioId) 
    return res.status(500).json(messageHandler(
        'Houve um erro, tente novamente!'
    ))

    // Puxa os dados
    const data = await Funcionarios.findOne({
        where: {
            id: funcionarioId
        }
    })

    // Valida os dados
    if(!data) 
    return res.status(500).json(messageHandler(
        'Dados nao encontrados!'
    ))

    res.status(200).json(data);

})

// Cadastra um funcionario e atrela ele a um carro especifico
router.post('/funcionarios', async (req, res) => {

    const { veiculoId, nome, telefone, identificadorEmpresa } = req.body;

    // Validacao dos dados  
    if(!veiculoId || !nome || !telefone) 
    return res.status(500).json(messageHandler(
        'Por favor, preencha todos os campos!'
    ))

    // Validar se o telefone ja existe
    const telefoneValidate = await Funcionarios.findOne({
        where: {
            telefone: telefone
        }
    })

    if(telefoneValidate) 
    return res.status(500).json(messageHandler(
        'Telefone ja cadastrado!'
    ))

    // Insere os dados no banco
    await Funcionarios.create({
        nome: nome,
        telefone: telefone,
        identificadorEmpresa: identificadorEmpresa ? identificadorEmpresa : '',
        veiculoid: veiculoId
    })

    // Retorna resposta    
    res.status(200).json(messageHandler(
        'Funcionario cadastrado com sucesso!',
        false
    ))

})

// Atualiza os dados de um funcionario
router.put('/funcionarios', async (req, res) => {

    const { funcionarioId, nome, telefone, identificadorEmpresa } = req.body;

    // Validacao minima de dados
    if(!funcionarioId || !nome || !telefone)
    return res.status(500).json(messageHandler(
        'Todos os campos devem estar preenchidos!'
    ))

    // Atualiza os dados
    await Funcionarios.update({
        nome: nome,
        telefone: telefone,
        identificadorEmpresa: identificadorEmpresa
    }, {
        where: {
            id: funcionarioId
        }
    })

    // Da uma resposta
    res.status(200).json(messageHandler(
        'Dados atualizados com sucesso!',
        false
    ))

})

// // Deleta um usuario em especifico
// router.delete('/funcionario/:funcionarioId', async (req, res) => {

//     const funcionarioId = req.params.funcionarioId;

//     // Validacao
//     if(!funcionarioId) 
//     return res.status(500).json(messageHandler(
//         'Houve um erro, tente novamente!'
//     ));

//     // Delete dos dados da database
//     await Funcionarios.destroy({
//         where: {
//             id: funcionarioId 
//         }
//     })

//     // Retorna resposta
//     res.status(200).json(messageHandler(
//         'Funcionario excluido com sucesso!',
//         false
//     ))

// })

module.exports = router;