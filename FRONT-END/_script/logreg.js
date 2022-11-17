
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
        alertCadastroHandler(alertReg, 'Por favor preencha todos os campos!', true);
        return;
    }

    if(senha !== confirmaSenha) {
        alertCadastroHandler(alertReg, 'As senhas devem ser iguais!', true)
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
        alertCadastroHandler(alertReg, resposta.message, true)
    } else {

        alertCadastroHandler(alertReg, 'Cadastrado com sucesso!', false)
        
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
        alertCadastroHandler(alertLog, 'Por favor preencha todos os campos!', true)
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
        alertCadastroHandler(alertLog, resposta.message, true);
    } else {
        // Salva o token 
        const token = resposta.token;

        localStorage.setItem('verification', token);

        if(localStorage.getItem('verification')) {
            // Redirecionamento
            window.location.assign('menu.html');
        }

    }

    return;

})

// Funcoes
function alertCadastroHandler(el, msg, error) {

    let className = error ? 'alert_danger' : 'alert_sucess';
    el.classList.add(className);
    el.classList.remove('hidden');
    el.textContent = msg;

}
