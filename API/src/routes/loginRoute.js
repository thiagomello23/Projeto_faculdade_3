
const express = require('express');
const router = express.Router();
const Empresa = require('../models/Empresa');
const bcrypt = require('bcrypt');
const messageHandler = require('../helper/messageHandler');
const jwt = require('jsonwebtoken');

// LOGIN/LOGOUT
router.post('/login', async (req, res) => {

    // DADOS 
    const { emailContato, senha } = req.body;

    // VALIDA SE TODOS OS DADOS ESTAO PREENCHIDOS
    if(!emailContato || !senha) return res.status(500).json(messageHandler(
        "Necessario preencher todos os campos"
    ));

    // VALIDA SE O EMAIL ESTA CADASTRADO
    const data = await Empresa.findOne({
        where: {
            emailContato: emailContato
        }
    })

    if(!data) return res.status(500).json(messageHandler(
        "Email invalido"
    ));

    // VALIDA SE AS SENHAS SE COINCIDEM 
    const validate = await bcrypt.compare(senha, data.senha);

    if(!validate) return res.status(500).json(messageHandler(
        "Senha incorreta"
    ));

    // CRIO UMA SESSAO
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({
        id: data.id,
        email: data.emailContato
    }, secret)

    // RETORNO UMA RESPOSTA
    res.status(200).json({
        error: false,
        token: token,
        message: 'Logado com sucesso!'
    });

});

router.get('/logout', async (req, res) => {

    try {

    } catch(err) {
        return res.status(500).json("Erro ao finalizar sessao");
    }

    res.status(200).json(messageHandler(
        "Sessao finalizada com sucesso",
        false
    ));

});

module.exports = router;