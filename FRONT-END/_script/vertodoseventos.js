
// Parametros URL
const url = new URLSearchParams(window.location.search);
const veiculoId = url.get('id');

async function getData() {

    if(!veiculoId || isNaN(veiculoId)) {
        window.location.assign('menu.html')
        return;
    }   

    const requisicao = await fetch(`http://localhost:3000/veiculos/${veiculoId}`, {
        method: 'get',
        headers: {
            'authorization': localStorage.getItem('verification'),
        }
    })

    const resposta = await requisicao.json();

    const eventosVeiculos = await resposta.eventosveiculos;

    insertData(eventosVeiculos);

}

function insertData(data) {

    let html = '';
    const containerEventos = document.getElementById('containerEventos');

    for(let i = 0; i < data.length; i++) {
        html += `
        <a href="edicaoevento.html?id=${data[i].id}" class="eventoCard">
            <h3>Nome:</h3>
            <span>${data[i].nomeEvento}</span>
            <h3>Tipo:</h3>
            <span class="${data[i].tipo == 'Reparo' ? 'reparo' : 'acidente'}">${data[i].tipo}</span>
        </a>
        `
    }

    containerEventos.innerHTML = html;

}

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})

getData();