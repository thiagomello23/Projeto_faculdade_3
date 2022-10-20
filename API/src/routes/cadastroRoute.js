
const express = require("express");
const router = express.Router();
const Empresa = require('../models/Empresa');
const bcrypt = require('bcrypt');
const messageHandler = require('../helper/messageHandler');

const configStorage = require('../middlewares/uploadImage');
const jwt = require('jsonwebtoken');
const checkToken = require("../middlewares/checkToken");
const upload = configStorage('empresa');

// CADASTRO 
// cadastra um usuario
router.post('/cadastro', async (req, res) => {

    // DADOS 
    const { emailContato, nomeEmpresa, cnpj, senha } = req.body;

    console.log(req.body);

    // VALIDACAO
    // regras de negocio
    // falta validar email
    if(!emailContato) return res.status(500).json("erro email");

    if(!nomeEmpresa || nomeEmpresa.length > 50) return res.status(500).json(messageHandler(
        "Nome muito grande ou não preenchido, max: 50 caracteres!"
    ));

    if(!cnpj || cnpj.length < 14) return res.status(500).json(messageHandler(
        "CNPJ Invalido!"
    ));

    if(!senha || senha.length > 20 || senha.length < 8) return res.status(500).json(messageHandler(
        "Senhas devem ter no mínimo 8 caracteres e no maximo 20!"
    ));

    // CRIPTOGRAFANDO SENHA
    const hashSenha = await bcrypt.hash(senha, 10);

    // VERIFICAR SE O EMAIL JA EXISTE
    const data = await Empresa.findOne({
        where: {
            emailContato: emailContato
        }
    })

    if(data) return res.status(500).json(messageHandler(
        "Email ja cadastrado"
    ));

    // VERIFICA SE O CNPJ JA EXISTE
    const data2 = await Empresa.findOne({
        where: {
            cnpj: cnpj
        }
    })

    if(data2) return res.status(500).json("CNPJ ja cadastrado");

    // INSERIR NO BANCO 
    await Empresa.create({
        emailContato: emailContato,
        nomeEmpresa: nomeEmpresa,
        cnpj: cnpj,
        senha: hashSenha
    })

    res.status(200).json({
        error: false,
        message: "Cadastrado com sucesso",
        token: token
    })

});

// Pega os dados de um usuario em especifico
router.get('/cadastro/', checkToken, async (req, res) => {

    // Pegar os dados do ID da empresa via JWT
    const token = req.headers['authorization'];
    const tokenData = jwt.decode(token);

    // Valida o ID
    if(!tokenData.id) return res.status(500).json(messageHandler("ID invalido!"));

    // Pega os dados com base no ID
    const data = await Empresa.findByPk(tokenData.id);

    // Valida os dados
    if(!data) return res.status(500).json(messageHandler("ID invalido!"));

    res.status(200).json(data);

});

// Update dos dados de um cadastro em especifico
// rota para adicionar imagens ou trocar de senha
router.put('/cadastro', upload.single('empresaImg'), async (req, res) => {

    let imgName;
    const { empresaId } = req.body;

    if(!empresaId) return res.status(500).json(messageHandler('Dados invalidos!'))

    if(req.file) {
        imgName = req.file.filename;
    }

    await Empresa.update({
        empresaImgPath: imgName ? imgName : ''
    }, {
        where: {
            id: empresaId
        }
    })

    res.status(200).json(messageHandler(
        'Perfil atualizado com sucesso!',
        false
    ))

});

module.exports = router;