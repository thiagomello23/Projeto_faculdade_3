const logout = document.getElementById('logout');

async function changeTemplate() {

    const token = localStorage.getItem('verification');

    if(!token) return;

    const loginRegistro = document.getElementById('loginRegistro');

    loginRegistro.textContent = 'Perfil';
    loginRegistro.href = './_pages/menu.html'
    logout.textContent = 'Logout';

}

// Logout
logout.addEventListener('click', () => {

    localStorage.setItem('verification', '');
    window.location.reload();

})

changeTemplate();