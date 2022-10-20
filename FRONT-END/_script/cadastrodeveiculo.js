
// Falta proteger esta pagina de acessos alheios
const cadastroBtn = document.getElementById('cadastroBtn');
const alertCadastro = document.getElementById('alertCadastro');

cadastroBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const modelo = document.getElementById('modelo').value;
    const renavan = document.getElementById('renavan').value;
    const placaVeiculo = document.getElementById('placaVeiculo').value;
    const veiculoimg = document.getElementById('veiculoImg').files[0];

    // Verificacao dos dados
    if(!modelo || !renavan || !placaVeiculo) {
        alertCadastroHandler(true, 'Por favor preencha todos os campos!');
        return;
    }

    const requisicao = await fetch('http://localhost:3000/veiculos/', {
        method: 'post',
        headers: {
            'authorization': localStorage.getItem('verification'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            modelo: modelo,
            renavan: renavan,
            placaVeiculo: placaVeiculo,
            veiculoimg: veiculoimg
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