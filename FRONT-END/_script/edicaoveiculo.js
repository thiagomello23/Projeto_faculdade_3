
const editBtn = document.getElementById('editBtn');

// Variaveis
const modelo = document.getElementById('modelo')
const renavan = document.getElementById('renavan');
const placaVeiculo = document.getElementById('placaVeiculo');
const veiculoImg = document.getElementById('veiculoImg');
const alertCadastro = document.getElementById('alertCadastro');
const formImg = document.getElementById('formImg');

// Pega os dados da URL
const url = new URLSearchParams(window.location.search);
const veiculoId = url.get('id');

async function getData() {

    const requisicao = await fetch(`http://localhost:3000/veiculos/${veiculoId}`, {
        method: 'get',
        headers: {
            'authorization': localStorage.getItem('verification')
        }
    })

    const resposta = await requisicao.json();

    insertData(resposta);

}

function insertData(data) {

    modelo.value = data.modelo;
    renavan.value = data.renavan;
    placaVeiculo.value = data.placaVeiculo;
    formImg.src = '../../API/src/images/veiculos/' + data.veiculoImgPath
    ;

    // Falta a imagem

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
    if(!modelo.value || !placaVeiculo.value || !renavan.value) {
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    const file = veiculoImg.files[0];

    const formData = new FormData();
    formData.append('modelo', modelo.value);
    formData.append('renavan', renavan.value);
    formData.append('placaVeiculo', placaVeiculo.value);
    formData.append('veiculoId', veiculoId);
    formData.append('veiculoImg', file)

    // Fetch data
    const requisicao = await fetch('http://localhost:3000/veiculos', {
        method: 'put',
        headers: {
            'authorization': localStorage.getItem('verification')
        },
        body: formData
    })

    const resposta = await requisicao.json();

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

// Funcao de inicializacao
getData();