
async function getData() {

    // Ler parametros URL
    const url = new URLSearchParams(window.location.search);
    const eventoId = url.get('id');

    // Puxar os dados
    const requisicao = await fetch(`http://localhost:3000/eventos/${eventoId}`)

    const resposta = await requisicao.json();

    // Montar os dados na tela
    insertData(resposta);

}

function insertData(data) {

    const eventoTitulo = document.getElementById('eventoTitulo');
    const eventoTipo = document.getElementById('eventoTipo');
    const eventoData = document.getElementById('eventoData');
    const eventoDescricao = document.getElementById('eventoDescricao');

    eventoTitulo.textContent = data.nomeEvento;

    // Se for acidente a cor e em vermelho e se for Reparo e em verde
    eventoTipo.textContent = data.tipo;

    // Falta formatacao de data
    eventoData.textContent = data.data;
    
    eventoDescricao.textContent = data.descricao;

}

getData();