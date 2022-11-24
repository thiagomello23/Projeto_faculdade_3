
// Pegando parametros URL
const url = new URLSearchParams(window.location.search);
const pesquisa = url.get('p');

const token = localStorage.getItem('verification')

async function pesquisaData() {

    const requisicao = await fetch('http://localhost:3000/pesquisa', {
        method: 'POST',
        headers: {
            'authorization': token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            pesquisa: pesquisa
        })
    });

    const resposta = await requisicao.json();

    montaPesquisaData(resposta);

}

function montaPesquisaData(data) {

    let html = '';
    const renderizaPesquisa = document.getElementById('renderizaPesquisa');

    if(data.message) {
        renderizaPesquisa.innerHTML = '<h1 class="pesquisa--alert">Nenhum veiculo encontrado!</h1>'
        return;
    }

    for(let i = 0; i < data.length; i++) {

        html+= `<a href=${`./visualizacaoveiculo.html?id=${data[i].id}`} class="pesquisaCard">
                    <h4>Modelo:</h4>
                    <span>${data[i].modelo}</span>
                    <h4>Placa:</h4>
                    <span>${data[i].placaVeiculo}</span>
                    <h4>Renavan:</h4>
                    <span>${data[i].renavan}</span>
                    <div class="imgContainer">
                        <img src="${'../../API/src/images/veiculos/' + data[i].veiculoImgPath}" alt="" class="imgPesquisa">
                    </div>
                </a>
    `

    }

    renderizaPesquisa.innerHTML = html;

}

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})

pesquisaData();