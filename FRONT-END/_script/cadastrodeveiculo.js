
// Falta proteger esta pagina de acessos alheios
const cadastroBtn = document.getElementById('cadastroBtn');
const alertCadastro = document.getElementById('alertCadastro');

cadastroBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const modelo = document.getElementById('modelo');
    const renavan = document.getElementById('renavan');
    const placaVeiculo = document.getElementById('placaVeiculo');
    const veiculoImg = document.getElementById('veiculoImg')
    const file = veiculoImg.files[0];

    // Verificacao dos dados
    if(!modelo || !renavan || !placaVeiculo) {
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    const dadosForm = new FormData();
    dadosForm.append('modelo', modelo.value);
    dadosForm.append('renavan', renavan.value);
    dadosForm.append('placaVeiculo', placaVeiculo.value);
    dadosForm.append('veiculoImg', file);

    const requisicao = await fetch('http://localhost:3000/veiculos/', {
        method: 'post',
        headers: {
            'authorization': localStorage.getItem('verification')
        },
        body: dadosForm
    })

    // JSON.stringify({
    //     modelo: modelo.value,
    //     renavan: renavan.value,
    //     placaVeiculo: placaVeiculo.value,
    //     veiculoImg
    // })

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
