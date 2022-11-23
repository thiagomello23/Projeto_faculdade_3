
// Parametros URL
const url = new URLSearchParams(window.location.search);
const eventoId = url.get('id');

const editBtn = document.getElementById('editBtn');

// Variaveis
const nomeOcorrido = document.getElementById('nomeOcorrido');
const tipoOcorrido = document.getElementById('tipoOcorrido');
const descricaoOcorrido = document.getElementById('descricaoOcorrido');
const alertCadastro = document.getElementById('alertCadastro');
const acidenteTipo = document.getElementById('acidenteTipo');
const reparoTipo = document.getElementById('reparoTipo')

async function getData() {

    const requisicao = await fetch(`http://localhost:3000/eventos/${eventoId}`, {
        method: 'get',
        headers: {
            'authorization': localStorage.getItem('verification')
        }
    })

    const resposta = await requisicao.json();

    insertData(resposta);

}

function insertData(data) {

    nomeOcorrido.value = data.nomeEvento;

    // Um problema no selected
    if(data.tipo == 'Reparo') {
        reparoTipo.selected = true;
    } else {
        acidenteTipo.selected = true;
    }
    
    descricaoOcorrido.value = data.descricao;

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

    // Validacao minima de dados
    if(!nomeOcorrido.value || !tipoOcorrido.value || !descricaoOcorrido.value) {
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    // Fetch data
    const requisicao = await fetch('http://localhost:3000/eventos', {
        method: 'put',
        headers: {
            'authorization': localStorage.getItem('verification'),
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({
            nomeEvento: nomeOcorrido.value,
            tipo: tipoOcorrido.value,
            eventoId: eventoId,
            descricao: descricaoOcorrido.value
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

// Funcao init
getData();