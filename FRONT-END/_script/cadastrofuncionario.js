
// Falta proteger esta pagina de acessos alheios
const cadastroBtn = document.getElementById('cadastroBtn');

cadastroBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeFuncionario = document.getElementById('nomeFuncionario').value;
    const telefoneFuncionario = document.getElementById('telefoneFuncionario').value;
    const identificadorFuncionario = document.getElementById('identificadorFuncionario').value;

    // Validacao minima de dados
    if(!nomeFuncionario || !telefoneFuncionario) {
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
    const requisicao = await fetch('http://localhost:3000/funcionarios', {
        method: 'post',
        headers: {
            'authorization': localStorage.getItem('verification'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeFuncionario,
            telefone: telefoneFuncionario,
            identificadorEmpresa: identificadorFuncionario,
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

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.assign('../trab2semestre.html');

})

function alertCadastroHandler(error, msg) {

    let className = error ? 'alert_danger' : 'alert_sucess';
    const alertCadastro = document.getElementById('alertCadastro');
    alertCadastro.classList.add(className);
    alertCadastro.classList.remove('hidden');
    alertCadastro.textContent = msg;

}