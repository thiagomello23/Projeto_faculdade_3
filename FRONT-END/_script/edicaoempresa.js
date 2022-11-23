
// Variaveis
const alertCadastro = document.getElementById('alertCadastro');
const editBtn = document.getElementById('editBtn');
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');
const empresaImg = document.getElementById('empresaImg');
const formImg = document.getElementById('formImg');

const token = localStorage.getItem('verification')

async function getData() {

    const requisicao = await fetch(`http://localhost:3000/cadastro/`, {
        method: 'get',
        headers: {
            'authorization': token
        }
    })

    const resposta = await requisicao.json();

    if(resposta.error) {
        // Redirect
        return window.location.assign('logreg.html');
    } else {

        if(resposta.empresaImgPath) {
            formImg.src = '../../API/src/images/empresa/' + resposta.empresaImgPath;
        } else {
            formImg.src = '../_img/imagem-padrao.png';
        }

    }

}

// Evento
editBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Validacao dos dados
    if(senha.value != confirmaSenha.value || senha.value.length < 8) {
        // Alert
        return;
    } 

    const file = empresaImg.files[0];

    const formData = new FormData();
    formData.append('senha', senha.value);
    formData.append('confirmaSenha', confirmaSenha.value);
    formData.append('empresaImg', file);

    // Fetch data
    const requisicao = await fetch('http://localhost:3000/cadastro/', {
        method: 'PUT',
        headers: {
            'authorization': token
        },
        body: formData
    })

    // Valido a resposta
    const resposta = await requisicao.json();

    if(resposta.error) {
        alertCadastroHandler(true, resposta.message);
    } else {
        alertCadastroHandler(false, resposta.message);
    }

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

getData();