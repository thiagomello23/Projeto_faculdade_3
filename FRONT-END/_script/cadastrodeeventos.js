
// Alert
const alertCadastro = document.getElementById('alertCadastro');

const cadastroBtn = document.getElementById('cadastroBtn');

cadastroBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeOcorrido = document.getElementById('nomeOcorrido').value;
    const tipoOcorrido = document.getElementById('tipoOcorrido').value;
    const descricaoOcorrido = document.getElementById('descricaoOcorrido').value;

    // Validacao
    if(!nomeOcorrido || !tipoOcorrido || !descricaoOcorrido) {
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    // Pegar o ID do veiculo via URL
    const url = new URLSearchParams(window.location.search);
    const veiculoId = url.get('id');

    if(!veiculoId) {
        // Redireciona
    }

    // API
    const requisicao = await fetch('http://localhost:3000/eventos', {
        method: 'post',
        headers: {
            'authorization': localStorage.getItem('verification'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeEvento: nomeOcorrido,
            tipo: tipoOcorrido,
            descricao: descricaoOcorrido,
            veiculoId: veiculoId
        })
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        alertCadastroHandler(true, resposta.message);
    } else {
        alertCadastroHandler(false, resposta.message);
    }

    return;

})

function alertCadastroHandler(error, msg) {

    let className = error ? 'alert_danger' : 'alert_sucess';
    alertCadastro.classList.add(className);
    alertCadastro.classList.remove('hidden');
    alertCadastro.textContent = msg;

}

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})