
// Funcoes
async function cadastroData() {

    const token = localStorage.getItem('verification')

    const requisicao = await fetch(`http://localhost:3000/cadastro/`, {
        method: 'get',
        headers: {
            'authorization': token
        }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        // Redirect
    } else {
        montaCadastroData(resposta);
    }

}

function montaCadastroData(data) {

    const empresaId = document.getElementById('empresaId');
    const emailId = document.getElementById('emailId');
    const cnpjId = document.getElementById('cnpjId');

    empresaId.textContent = data.nomeEmpresa;
    emailId.textContent = data.emailContato;
    cnpjId.textContent = data.cnpj;

}

// Execucao das funcoes
cadastroData();