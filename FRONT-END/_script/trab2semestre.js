
async function changeTemplate() {

    const token = localStorage.getItem('verification');

    if(!token) return;

    const loginRegistro = document.getElementById('loginRegistro');
    const loginRegistroHref = document.getElementById('loginRegistroHref');

    loginRegistro.textContent = 'Perfil';
    loginRegistroHref.href = './_pages/menu.html'

}

changeTemplate();