
// Alerts
const alertReg = document.getElementById('alertReg');
const alertLog = document.getElementById('alertLog');

// CADASTRO
const btnCadastro = document.getElementById('btnCadastro');

btnCadastro.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeEmpresa = document.getElementById('nomeEmpresa').value;
    const emailContato = document.getElementById('emailContato').value;
    const cnpj = document.getElementById('cnpj').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    // Validacao
    if(!nomeEmpresa || !emailContato || !cnpj || !senha || !confirmaSenha) {
        ativaAlertUsuario(alertReg, 'Por favor preencha todos os campos!');
        return;
    }

    if(senha !== confirmaSenha) {
        ativaAlertUsuario(alertReg, 'As senhas devem ser iguais!')
        return;
    }

    // Enviar os dados
    const requisicao = await fetch('http://localhost:3000/cadastro', {
        method: 'post',
        body: JSON.stringify({
            nomeEmpresa: nomeEmpresa,
            emailContato: emailContato,
            cnpj: cnpj,
            senha: senha
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        // Colocar alerts no front
        ativaAlertUsuario(alertReg, resposta.message)
    } else {
        // Redirecionamento
        window.location.assign('file:///C:/Users/W10/Desktop/a/Curso/Faculdade/Desenvolvimento/Projeto-2-semestre-main/trab2semestre.html');
    }

    return;

})

// LOGIN
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    // Validar
    if(!emailLogin || !senhaLogin) {
        ativaAlertUsuario(alertLog, 'Por favor preencha todos os campos!')
        return;
    }

    // API
    const requisicao = await fetch('http://localhost:3000/login', {
        method: 'post',
        body: JSON.stringify({
            emailContato: emailLogin,
            senha: senhaLogin
        }),
         headers: {
            'Content-Type': 'application/json'
         }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        // Alert no front
        ativaAlertUsuario(alertLog, resposta.message);
    } else {
        // Salva o token 
        const token = resposta.token;

        localStorage.setItem('verification', token);

        // Redirect
        window.location.assign('file:///C:/Users/W10/Desktop/a/Curso/Faculdade/Desenvolvimento/Projeto-2-semestre-main/trab2semestre.html');
    }

    return;

})

// Funcoes
function ativaAlertUsuario(el, msg) {

    el.classList.remove('hidden');
    el.textContent = msg;

}
