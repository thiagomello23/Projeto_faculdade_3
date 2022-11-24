
// Parametros URL
const url = new URLSearchParams(window.location.search);
const funcionarioId = url.get('id');

const editBtn = document.getElementById('editBtn');

// Variaveis
const nomeFuncionario = document.getElementById('nomeFuncionario');
const telefoneFuncionario = document.getElementById('telefoneFuncionario');
const identificadorFuncionario = document.getElementById('identificadorFuncionario');
const alertCadastro = document.getElementById('alertCadastro');

async function getData() {

    const requisicao = await fetch(`http://localhost:3000/funcionarios/${funcionarioId}`, {
        method: 'get',
        headers: {
            'authorization': localStorage.getItem('verification')
        }
    })

    const resposta = await requisicao.json();

    insertData(resposta);

}

function insertData(data) {

    nomeFuncionario.value = data.nome;
    telefoneFuncionario.value = data.telefone;
    identificadorFuncionario.value = data.identificadorEmpresa;

}

function alertCadastroHandler(error, msg) {

    let className = error ? 'alert_danger' : 'alert_sucess';
    alertCadastro.classList.add(className);
    alertCadastro.classList.remove('hidden');
    alertCadastro.textContent = msg;

}

// Evento
editBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Validacao dos dados
    if(!nomeFuncionario.value || !telefoneFuncionario.value || !identificadorFuncionario.value){
        // Alert
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    // Fetch data
    const requisicao = await fetch('http://localhost:3000/funcionarios', {
        method: 'put',
        headers: {
            'authorization': localStorage.getItem('verification'),
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            funcionarioId: funcionarioId,
            nome: nomeFuncionario.value,
            telefone: telefoneFuncionario.value,
            identificadorEmpresa: identificadorFuncionario.value
        })
    })
    
    const resposta = await requisicao.json();

    // Alerts
    if(resposta.error) {
        alertCadastroHandler(true, resposta.message);
    } else {
        alertCadastroHandler(false, resposta.message);
    }

    return;

})

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})

getData();