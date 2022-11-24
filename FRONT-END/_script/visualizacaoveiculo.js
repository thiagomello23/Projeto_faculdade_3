
// Parametros URL
const url = new URLSearchParams(window.location.search);
const veiculoId = url.get('id');

// Variaveis
const edicaoVeiculoId = document.getElementById('edicaoVeiculoId');
const eventosBtn = document.getElementById('eventosBtn');

const MAX_EVENTOS = 5;

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

    insertData(resposta);

}

function insertData(data) {

    // Veiculo
    const modelo = document.getElementById('modelo');
    const renavan = document.getElementById('renavan');
    const placa = document.getElementById('placa');

    // Funcionario
    const nome = document.getElementById('nome');
    const telefone = document.getElementById('telefone');
    const identificador = document.getElementById('identificador');
    const veiculoImage = document.getElementById('veiculoImage');

    // Veiculo
    modelo.textContent = data.modelo;
    placa.textContent = data.placaVeiculo;
    renavan.textContent = data.renavan;
    veiculoImage.src = '../../API/src/images/veiculos/' + data.veiculoImgPath;

    // Excecoes
    const funcionarioDados = document.getElementById('funcionarioDados');
    const funcionarioBtn = document.getElementById('funcionarioBtn');
    const eventosView = document.getElementById('eventosView');

    // Funcionario
    if(!data.funcionario) {

        funcionarioDados.innerHTML = '<h4>Nenhum Funcionario cadastrado ainda!</h4>'
        funcionarioBtn.textContent = 'Cadastrar Funcionario!'
        funcionarioBtn.href = `cadastrodefuncionario.html?id=${veiculoId}`;

    } else {
        nome.textContent = data.funcionario.nome;
        telefone.textContent = data.funcionario.telefone;
        identificador.textContent = data.funcionario.identificadorEmpresa;
        
        funcionarioBtn.textContent = 'Editar Funcionario'
        funcionarioBtn.href = `edicaofuncionario.html?id=${data.funcionario.id}`;

    }

    // Evento veiculo
    // Apenas 5 eventos puxados, rever na API
    if(data.eventosveiculos.length == 0) {
        // Excecoes
        const eventosDados = document.getElementById('eventosDados');

        eventosDados.innerHTML = '<h4>Nenhum Evento cadastrado ainda!</h4>'

    } else {

        let eventosVeiculosHtml = ''

        for(let i = 0; i < MAX_EVENTOS; i++) {

            if(data.eventosveiculos[i] == null) break;

            eventosVeiculosHtml += `
                <a href="edicaoevento.html?id=${data.eventosveiculos[i].id}" class="evento_conteudo">
                    <h3>${data.eventosveiculos[i].nomeEvento}</h3>
                    <span class="evento_linha"></span>
                    <h3 class="${data.eventosveiculos[i].tipo == 'Reparo' ? 'reparo' : 'acidente'}">
                        ${data.eventosveiculos[i].tipo}
                    </h3>
                </a>
            `
        }

        const eventosDados = document.getElementById('eventosDados');
        eventosDados.innerHTML = eventosVeiculosHtml;

    }

    // Aba de navegacao
    edicaoVeiculoId.href = `edicaoveiculo.html?id=${data.id}`
    eventosBtn.href = `cadastrodeeventos.html?id=${data.id}`
    eventosView.href = `vertodoseventos.html?id=${veiculoId}`

}

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})

getData();