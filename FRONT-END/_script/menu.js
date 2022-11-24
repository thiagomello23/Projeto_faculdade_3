
const paginationContainer = document.getElementById('paginationContainer');
const paginationButtonContainer = document.getElementById('paginationButtonContainer')
const pesquisa = document.getElementById('pesquisa');
const formPesquisa = document.getElementById('formPesquisa');
const token = localStorage.getItem('verification')

// Funcoes
async function cadastroData() {

    const requisicao = await fetch(`http://localhost:3000/cadastro/`, {
        method: 'get',
        headers: {
            'authorization': token
        }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        // Redirect
        return window.location.assign('logreg.html')
    } else {
        montaCadastroData(resposta);
    }

}

function montaCadastroData(data) {

    const empresaId = document.getElementById('empresaId');
    const emailId = document.getElementById('emailId');
    const cnpjId = document.getElementById('cnpjId');
    const empresaImg = document.getElementById('empresaImg');

    empresaId.textContent = data.nomeEmpresa;
    emailId.textContent = data.emailContato;
    cnpjId.textContent = data.cnpj;

    if(data.empresaImgPath) {
        empresaImg.src = '../../API/src/images/empresa/' + data.empresaImgPath;
    } else {
        empresaImg.src = '../_img/imagem-padrao.png';
    }

}

// Pagination
let paginaAtual = 1;
const rowsPerPage = 5;

async function veiculoData() {
    const limit = 5;
    const offset = 0;

    const requisicao = await fetch(`http://localhost:3000/veiculos/all/?limit=${limit}&offset=${offset}`, {
        method: 'get',
        headers: {
            'authorization': token
        }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        paginationContainer.innerHTML = `<h5>${resposta.message}</h5>`
    } else {
        montaItemsPagination(resposta, paginaAtual, rowsPerPage, paginationContainer);
        montaPagination(resposta, paginationButtonContainer, rowsPerPage)
    }

}

function montaItemsPagination(data, page, rowsPerPage, wrapper) {

    let html = '';
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItem = data.slice(start, end);

    paginatedItem.forEach(item => {
        html += `
            <a href="visualizacaoveiculo.html?id=${item.id}" class="veiculo_conteudo">
                <img src="${'../../API/src/images/veiculos/' + item.veiculoImgPath}" alt="" class="veiculo_image">
                <div class="veiculo_info">
                    <h5>${item.modelo}</h5>
                    <h5>${item.renavan}</h5>
                </div>
            </a>
        `
    })

    // Inserir na pagina
    wrapper.innerHTML = html;

}

function montaPagination(data, wrapper, rowsPerPage) {

    wrapper.innerHTML = "";
    let pageCount = Math.ceil(data.length / rowsPerPage);

    for(let i = 1; i < pageCount + 1; i++) {
       let btn = paginationButton(i, data);
       wrapper.appendChild(btn);
    }

}

function paginationButton(page, data) {

    let button = document.createElement('button');
    button.classList.add('pagination_button');
    button.innerText = page;

    if(paginaAtual == page) {
        button.classList.add('active');
    }

    button.addEventListener('click', () => {
        paginaAtual = page;
        montaItemsPagination(data, paginaAtual, rowsPerPage, paginationContainer)

        let botaoAtual = document.querySelector('.active')
        botaoAtual.classList.remove('active')

        button.classList.add('active');

    })

    return button;

}

// Pesquisa dados
formPesquisa.addEventListener('submit', async(e) => {
    e.preventDefault();

    if(!pesquisa.value) return;

    return window.location.assign(`pesquisa.html?p=${pesquisa.value}`)

})

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})


// Execucao das funcoes
cadastroData();
veiculoData();